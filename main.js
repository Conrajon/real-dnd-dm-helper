/**
 * Real DND DM Helper — Electron main process
 * Loads index.html via app:// protocol; serves index.html and srd-spells.js.
 * Handles Ollama (status, generate, pull), updates, window controls, single-instance.
 */
const { app, BrowserWindow, ipcMain, shell, protocol } = require('electron');
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');
const { spawn, execSync } = require('child_process');

const OLLAMA_DOWNLOAD_URL = 'https://ollama.com/download';
const UI_ENTRY_FILE = 'index.html';

let mainWindow;
let ollamaServeProcess = null;
let autoUpdater = null;
const isDev = !app.isPackaged;
const OLLAMA_START_DELAY_MS = 500;

function getAutoUpdater() {
  if (autoUpdater) return autoUpdater;
  try {
    autoUpdater = require('electron-updater').autoUpdater;
    return autoUpdater;
  } catch (e) {
    return null;
  }
}

function checkOllamaRunning() {
  return fetch('http://127.0.0.1:11434/api/tags', { method: 'GET', signal: AbortSignal.timeout(2000) })
    .then(r => r.ok)
    .catch(() => false);
}

function tryStartOllamaServe() {
  if (ollamaServeProcess) return;
  const ollamaPath = getOllamaPath();
  if (!ollamaPath) return;
  try {
    ollamaServeProcess = spawn(ollamaPath, ['serve'], {
      detached: true,
      stdio: 'ignore',
      windowsHide: true,
      shell: false
    });
    ollamaServeProcess.unref();
    ollamaServeProcess = null;
    notifyWhenOllamaUp();
  } catch (e) {
    console.warn('Could not start Ollama serve:', e && e.message);
  }
}

function notifyWhenOllamaUp() {
  const maxAttempts = 12;
  const intervalMs = 1500;
  let attempts = 0;
  function poll() {
    if (attempts >= maxAttempts) return;
    attempts++;
    checkOllamaRunning().then(ok => {
      if (ok && mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.webContents.send('app:ollama-now-running', {});
        return;
      }
      setTimeout(poll, intervalMs);
    });
  }
  setTimeout(poll, 2000);
}

function ensureOllamaThenReady() {
  checkOllamaRunning().then(ok => {
    if (ok) return;
    tryStartOllamaServe();
  });
}

function getOllamaPath() {
  try {
    const isWin = process.platform === 'win32';
    const cmd = isWin ? 'where ollama' : 'which ollama';
    const out = execSync(cmd, { encoding: 'utf8', timeout: 2000 });
    const line = (out && out.split('\n')[0]) ? out.split('\n')[0].trim() : '';
    return line || null;
  } catch (e) {
    return null;
  }
}

async function getOllamaStatus() {
  const connected = await checkOllamaRunning();
  const ollamaPath = getOllamaPath();
  return { connected: !!connected, path: ollamaPath || undefined };
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

if (process.platform === 'win32') {
  app.setAppUserModelId('com.dnd.dmhelper.real');
}

protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { standard: true, secure: true, supportFetchAPI: true } }
]);

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 980,
    minWidth: 1180,
    minHeight: 760,
    backgroundColor: '#0f0f1f',
    autoHideMenuBar: true,
    title: 'Real DND DM Helper',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      backgroundThrottling: false,
      spellcheck: false
    }
  });

  mainWindow.webContents.setWindowOpenHandler(({ url, disposition }) => {
    try {
      const u = new URL(url);
      if (u.protocol === 'http:' || u.protocol === 'https:') {
        shell.openExternal(url);
        return { action: 'deny' };
      }
    } catch (_) {}
    if (!url || url === 'about:blank' || url.startsWith('about:blank')) {
      return {
        action: 'allow',
        overrideBrowserWindowOptions: {
          width: 900,
          height: 700,
          webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true
          }
        }
      };
    }
    return { action: 'deny' };
  });

  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!url) return;
    try {
      const rawPath = decodeURIComponent(new URL(url).pathname || '');
      const normalizedNext = rawPath.replace(/\\/g, '/').replace(/^\//, '').toLowerCase();
      const appPath = path.join(__dirname, UI_ENTRY_FILE).replace(/\\/g, '/').toLowerCase();
      const appBasename = UI_ENTRY_FILE.toLowerCase();
      const sameFile = normalizedNext === appPath || normalizedNext.endsWith('/' + appBasename) || normalizedNext.endsWith(appBasename);
      if (!sameFile) event.preventDefault();
    } catch (_) {
      event.preventDefault();
    }
  });

  mainWindow.loadURL('app://./' + UI_ENTRY_FILE);

  mainWindow.once('ready-to-show', () => {
    if (!mainWindow) return;
    mainWindow.show();
    mainWindow.maximize();
    if (isDev) mainWindow.webContents.openDevTools({ mode: 'detach' });
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

ipcMain.on('app:windowMinimize', () => {
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.minimize();
});
ipcMain.on('app:windowMaximize', () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    if (mainWindow.isMaximized()) mainWindow.unmaximize();
    else mainWindow.maximize();
  }
});
ipcMain.on('app:windowClose', () => {
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.close();
});
ipcMain.handle('app:windowIsMaximized', () => {
  return mainWindow && !mainWindow.isDestroyed() && mainWindow.isMaximized();
});

const APP_ALLOWED_FILES = [UI_ENTRY_FILE, 'srd-spells.js'];

app.whenReady().then(() => {
  const { net } = require('electron');
  protocol.handle('app', (request) => {
    let pathname = UI_ENTRY_FILE;
    try {
      const u = new URL(request.url);
      const raw = (u.pathname || '').replace(/^\/+/, '').replace(/\/+$/, '');
      const segment = raw.split('/').filter(Boolean).pop() || '';
      if (segment && APP_ALLOWED_FILES.includes(segment)) pathname = segment;
    } catch (_) {}
    if (!pathname || pathname.includes('..')) pathname = UI_ENTRY_FILE;
    const filePath = path.join(__dirname, pathname);
    if (!fs.existsSync(filePath)) return new Response('Not Found', { status: 404 });
    return net.fetch(pathToFileURL(filePath).href);
  });

  createMainWindow();
  setTimeout(ensureOllamaThenReady, OLLAMA_START_DELAY_MS);

  /* Auto-update: check GitHub Releases on startup (works in both dev and packaged) */
  const updater = getAutoUpdater();
  if (updater) {
    updater.autoDownload = false;
    updater.autoInstallOnAppQuit = app.isPackaged;
    updater.setFeedURL({
      provider: 'github',
      owner: 'Conrajon',
      repo: 'real-dnd-dm-helper'
    });
    if (!app.isPackaged) {
      updater.forceDevUpdateConfig = true;
      updater.currentVersion = require('./package.json').version;
    }
    const send = (channel, data) => {
      if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send(channel, data);
    };
    updater.on('update-available', (info) => send('app:update-available', { version: info.version }));
    updater.on('update-not-available', () => send('app:update-not-available', {}));
    updater.on('download-progress', (p) => send('app:update-download-progress', { percent: p.percent, bytesPerSecond: p.bytesPerSecond, transferred: p.transferred, total: p.total }));
    updater.on('update-downloaded', () => send('app:update-downloaded', {}));
    updater.on('error', (e) => {
      console.log('[updater] error:', e && e.message);
    });
    updater.checkForUpdates().catch(() => {});
  }

  app.on('second-instance', () => {
    if (!mainWindow) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('app:getVersion', () => app.getVersion());
ipcMain.handle('app:getBuildInfo', () => ({
  name: app.getName(),
  version: app.getVersion(),
  electron: process.versions.electron,
  chrome: process.versions.chrome,
  node: process.versions.node,
  platform: process.platform,
  arch: process.arch,
  packaged: app.isPackaged
}));

ipcMain.handle('app:ensureOllamaRunning', async () => {
  const ok = await checkOllamaRunning();
  if (ok) return { ok: true };
  tryStartOllamaServe();
  await new Promise(r => setTimeout(r, 2000));
  const nowOk = await checkOllamaRunning();
  return { ok: nowOk };
});

ipcMain.handle('app:getOllamaStatus', () => getOllamaStatus());
ipcMain.handle('app:openOllamaDownload', async () => {
  await shell.openExternal(OLLAMA_DOWNLOAD_URL);
  return { ok: true };
});

function findBundledOllamaInstaller() {
  const candidates = ['OllamaSetup.exe', 'ollamasetup.exe'];
  if (app.isPackaged && process.resourcesPath) {
    const base = path.join(process.resourcesPath, 'ollama');
    for (const name of candidates) {
      const p = path.join(base, name);
      if (fs.existsSync(p)) return p;
    }
  }
  const inOllama = path.join(__dirname, 'ollama');
  for (const name of candidates) {
    const p = path.join(inOllama, name);
    if (fs.existsSync(p)) return p;
  }
  if (fs.existsSync(path.join(__dirname, 'ollamasetup.exe'))) return path.join(__dirname, 'ollamasetup.exe');
  if (fs.existsSync(path.join(__dirname, 'OllamaSetup.exe'))) return path.join(__dirname, 'OllamaSetup.exe');
  return null;
}

ipcMain.handle('app:runOllamaSetup', async () => {
  const exePath = findBundledOllamaInstaller();
  if (!exePath) {
    await shell.openExternal(OLLAMA_DOWNLOAD_URL);
    return { ok: false, error: 'Installer not bundled. Opened download page: ' + OLLAMA_DOWNLOAD_URL };
  }
  try {
    const err = await shell.openPath(exePath);
    return err ? { ok: false, error: err } : { ok: true };
  } catch (e) {
    return { ok: false, error: (e && e.message) || String(e) };
  }
});

ipcMain.handle('app:checkForUpdates', async () => {
  const updater = getAutoUpdater();
  if (!updater) return { available: false, error: 'Updater module not available. Build the app with electron-builder first.' };
  try {
    /* In dev mode, electron-updater can still check GitHub for a newer version */
    updater.setFeedURL({
      provider: 'github',
      owner: 'Conrajon',
      repo: 'real-dnd-dm-helper'
    });
    if (!app.isPackaged) {
      updater.forceDevUpdateConfig = true;
      updater.autoDownload = false;
      updater.autoInstallOnAppQuit = false;
      updater.currentVersion = require('./package.json').version;
    }
    const result = await updater.checkForUpdates();
    if (!result || !result.updateInfo) return { available: false, dev: !app.isPackaged };
    const current = app.getVersion();
    const latest = result.updateInfo.version;
    if (latest && latest !== current) {
      return { available: true, version: latest, dev: !app.isPackaged };
    }
    return { available: false, dev: !app.isPackaged };
  } catch (e) {
    const msg = (e && e.message) ? e.message : String(e);
    /* If no GitHub repo/release exists yet, give a helpful message */
    if (/404|Not Found|no published/i.test(msg)) {
      return { available: false, dev: !app.isPackaged, error: 'No releases published yet on GitHub. Run "npm run release" to publish your first release.' };
    }
    return { available: false, dev: !app.isPackaged, error: msg };
  }
});

ipcMain.handle('app:downloadUpdate', async () => {
  if (!app.isPackaged) return { ok: false, error: 'Not packaged' };
  const updater = getAutoUpdater();
  if (!updater) return { ok: false, error: 'Updater not available in this build' };
  try {
    await updater.downloadUpdate();
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e && e.message) ? e.message : String(e) };
  }
});

ipcMain.handle('app:quitAndInstall', () => {
  const updater = getAutoUpdater();
  if (!updater) return { ok: false, error: 'Updater not available in this build' };
  updater.quitAndInstall(false, true);
  return { ok: true };
});

ipcMain.handle('app:pullOllamaModel', async (event, modelName) => {
  const model = (modelName && String(modelName).trim()) || 'llama2';
  try {
    if (process.platform === 'win32') {
      spawn('cmd', ['/c', 'start', 'cmd', '/k', 'ollama pull ' + model], { shell: false, detached: true, stdio: 'ignore' }).unref();
    } else {
      const child = spawn('ollama', ['pull', model], { shell: true, detached: true, stdio: 'inherit' });
      child.unref();
    }
    return { ok: true, message: 'A terminal window will open to download ' + model + '. Wait for it to finish, then try the AI again.' };
  } catch (e) {
    return { ok: false, error: (e && e.message) || String(e) };
  }
});

const OLLAMA_BASE = 'http://127.0.0.1:11434';
const OLLAMA_GENERATE_TIMEOUT_MS = 180000;

function userFriendlyOllamaError(err) {
  const msg = (err && err.message) ? err.message : String(err);
  const name = (err && err.name) ? err.name : '';
  if (!msg && !name) return 'AI request failed. Go to Options → AI and ensure Ollama is running and a model is installed (e.g. ollama pull llama2).';
  if (name === 'AbortError' || /aborted/i.test(msg)) {
    return 'Request timed out after ' + (OLLAMA_GENERATE_TIMEOUT_MS / 60000) + ' minutes. Story generation can take a while — try again or use a shorter prompt.';
  }
  if (/ECONNREFUSED|fetch failed|Failed to fetch|ENOTFOUND|ETIMEDOUT|ECONNRESET|network|timeout/i.test(msg)) {
    return 'Ollama is not running or not reachable. Go to Options → AI to install Ollama (if needed), start it, then pull a model: ollama pull llama2';
  }
  if (/model.*not found|404/i.test(msg)) {
    return 'Model not found. In a terminal run: ollama pull llama2 (or choose a model you have in Options → AI).';
  }
  return msg;
}

ipcMain.handle('app:ollamaTags', async (event, baseUrl) => {
  const url = (baseUrl || OLLAMA_BASE).trim().replace(/\/+$/, '') + '/api/tags';
  try {
    const res = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error('Ollama returned ' + res.status);
    const data = await res.json();
    return { ok: true, data };
  } catch (e) {
    return { ok: false, error: (e && e.message) ? e.message : String(e) };
  }
});

ipcMain.handle('app:ollamaGenerate', async (event, { baseUrl, model, prompt, system, options }) => {
  const url = (baseUrl || OLLAMA_BASE).trim().replace(/\/+$/, '') + '/api/generate';
  const body = { model: model || 'llama2', prompt: prompt || '', stream: false };
  if (system != null && String(system).trim() !== '') body.system = String(system).trim();
  if (options && typeof options === 'object' && Object.keys(options).length > 0) body.options = options;
  const doRequest = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), OLLAMA_GENERATE_TIMEOUT_MS);
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      const t = await res.text();
      const raw = 'Ollama returned ' + res.status + (t ? ': ' + t.slice(0, 200) : '');
      throw new Error(raw);
    }
    const data = await res.json();
    const response = (data && data.response != null) ? String(data.response) : '';
    return response.trim();
  };
  try {
    const response = await doRequest();
    return { ok: true, response };
  } catch (e) {
    const msg = (e && e.message) ? e.message : String(e);
    const isRetryable = /ECONNREFUSED|ETIMEDOUT|ECONNRESET|fetch failed|Failed to fetch|aborted|AbortError/i.test(msg);
    if (isRetryable) {
      try {
        await new Promise(r => setTimeout(r, 1500));
        const response = await doRequest();
        return { ok: true, response };
      } catch (e2) {
        return { ok: false, error: userFriendlyOllamaError(e2) };
      }
    }
    return { ok: false, error: userFriendlyOllamaError(e) };
  }
});

let _streamAbort = null;

ipcMain.handle('app:ollamaGenerateStream', async (event, { baseUrl, model, prompt, system, options }) => {
  const url = (baseUrl || OLLAMA_BASE).trim().replace(/\/+$/, '') + '/api/generate';
  const body = { model: model || 'llama2', prompt: prompt || '', stream: true };
  if (system != null && String(system).trim() !== '') body.system = String(system).trim();
  if (options && typeof options === 'object' && Object.keys(options).length > 0) body.options = options;
  const win = mainWindow;
  const send = (data) => {
    if (win && !win.isDestroyed()) win.webContents.send('ollama-stream-chunk', data);
  };
  if (_streamAbort) { try { _streamAbort.abort(); } catch (_) {} }
  const controller = new AbortController();
  _streamAbort = controller;
  const timeoutId = setTimeout(() => controller.abort(), OLLAMA_GENERATE_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      const t = await res.text();
      return { ok: false, error: 'Ollama returned ' + res.status + (t ? ': ' + t.slice(0, 200) : '') };
    }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buffer = '';
    let fullResponse = '';
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += dec.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      for (const line of lines) {
        const t = line.trim();
        if (!t) continue;
        try {
          const ev = JSON.parse(t);
          if (ev.response) {
            fullResponse += ev.response;
            send({ token: ev.response, done: false });
          }
          if (ev.done) {
            send({ token: '', done: true });
          }
        } catch (_) {}
      }
    }
    _streamAbort = null;
    return { ok: true, response: fullResponse.trim() };
  } catch (e) {
    clearTimeout(timeoutId);
    _streamAbort = null;
    const msg = (e && e.message) ? e.message : String(e);
    send({ token: '', done: true, error: true });
    return { ok: false, error: userFriendlyOllamaError(e) };
  }
});

ipcMain.handle('app:pullOllamaModelWithProgress', async (event, modelName) => {
  const model = (modelName && String(modelName).trim()) || 'llama2';
  const win = mainWindow;
  const send = (data) => {
    if (win && !win.isDestroyed()) win.webContents.send('ollama-pull-progress', data);
  };
  try {
    const ok = await checkOllamaRunning();
    if (!ok) {
      return { ok: false, error: 'Ollama is not running. Install and start Ollama first, then try again.' };
    }
    const res = await fetch(OLLAMA_BASE + '/api/pull', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, stream: true })
    });
    if (!res.ok) {
      return { ok: false, error: 'Ollama returned ' + res.status };
    }
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buffer = '';
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += dec.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      for (const line of lines) {
        const t = line.trim();
        if (!t) continue;
        try {
          const ev = JSON.parse(t);
          const status = ev.status || '';
          const total = typeof ev.total === 'number' ? ev.total : 0;
          const completed = typeof ev.completed === 'number' ? ev.completed : 0;
          let percent = 0;
          if (total > 0 && completed >= 0) percent = Math.min(100, Math.round((completed / total) * 100));
          send({ status, total, completed, percent, done: status === 'success' });
          if (ev.status === 'success') {
            return { ok: true, message: 'Model ' + model + ' is ready.' };
          }
        } catch (_) {}
      }
    }
    return { ok: true, message: 'Model ' + model + ' download finished.' };
  } catch (e) {
    const err = (e && e.message) ? e.message : String(e);
    send({ status: 'error', done: true });
    return { ok: false, error: err };
  }
});
