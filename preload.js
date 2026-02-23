/**
 * Real DND DM Helper — Preload script
 * Exposes safe desktopApp API to renderer (version, Ollama, window, updates).
 */
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopApp', {
  getVersion: () => ipcRenderer.invoke('app:getVersion'),
  getBuildInfo: () => ipcRenderer.invoke('app:getBuildInfo'),
  runOllamaSetup: () => ipcRenderer.invoke('app:runOllamaSetup'),
  ensureOllamaRunning: () => ipcRenderer.invoke('app:ensureOllamaRunning'),
  getOllamaStatus: () => ipcRenderer.invoke('app:getOllamaStatus'),
  openOllamaDownload: () => ipcRenderer.invoke('app:openOllamaDownload'),
  checkForUpdates: () => ipcRenderer.invoke('app:checkForUpdates'),
  downloadUpdate: () => ipcRenderer.invoke('app:downloadUpdate'),
  quitAndInstall: () => ipcRenderer.invoke('app:quitAndInstall'),
  pullOllamaModel: (modelName) => ipcRenderer.invoke('app:pullOllamaModel', modelName),
  pullOllamaModelWithProgress: (modelName) => ipcRenderer.invoke('app:pullOllamaModelWithProgress', modelName),
  ollamaTags: (baseUrl) => ipcRenderer.invoke('app:ollamaTags', baseUrl),
  ollamaGenerate: (opts) => ipcRenderer.invoke('app:ollamaGenerate', opts),
  ollamaGenerateStream: (opts) => ipcRenderer.invoke('app:ollamaGenerateStream', opts),
  onOllamaStreamChunk: (callback) => {
    const fn = (e, data) => callback(data);
    ipcRenderer.on('ollama-stream-chunk', fn);
    return () => ipcRenderer.removeListener('ollama-stream-chunk', fn);
  },
  minimizeWindow: () => ipcRenderer.send('app:windowMinimize'),
  maximizeWindow: () => ipcRenderer.send('app:windowMaximize'),
  closeWindow: () => ipcRenderer.send('app:windowClose'),
  isWindowMaximized: () => ipcRenderer.invoke('app:windowIsMaximized'),
  onOllamaPullProgress: (callback) => {
    const fn = (e, data) => callback(data);
    ipcRenderer.on('ollama-pull-progress', fn);
    return () => ipcRenderer.removeListener('ollama-pull-progress', fn);
  }
});

function forwardUpdateEvent(channel, eventName) {
  ipcRenderer.on(channel, (event, data) => {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data || {} }));
  });
}
forwardUpdateEvent('app:update-available', 'app:update-available');
forwardUpdateEvent('app:update-not-available', 'app:update-not-available');
forwardUpdateEvent('app:update-download-progress', 'app:update-download-progress');
forwardUpdateEvent('app:update-downloaded', 'app:update-downloaded');
forwardUpdateEvent('app:update-error', 'app:update-error');
forwardUpdateEvent('app:ollama-now-running', 'app:ollama-now-running');
