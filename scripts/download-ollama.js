/**
 * Download Ollama Windows installer into the ollama folder so the app
 * and NSIS installer can bundle it. Run before: npm run dist
 * If you already have OllamaSetup.exe, put it in the ollama/ folder and the script will use it.
 */
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const dns = require('dns');
const { URL } = require('url');

if (dns.setDefaultResultOrder) dns.setDefaultResultOrder('ipv4first');

const OLLAMA_URL = 'https://ollama.com/download/OllamaSetup.exe';
const ROOT = path.join(__dirname, '..');
const OLLAMA_DIR = path.join(ROOT, 'ollama');
const OUT_FILE = path.join(OLLAMA_DIR, 'ollamasetup.exe');
const OUT_FILE_ALT = path.join(OLLAMA_DIR, 'OllamaSetup.exe');
const MIN_SIZE_MB = 1;
const CONNECT_TIMEOUT_MS = 25000;
const DOWNLOAD_TIMEOUT_MS = 120000;

function get(url) {
  const u = new URL(url);
  const lib = u.protocol === 'https:' ? https : http;
  return new Promise((resolve, reject) => {
    const req = lib.get(url, {
      headers: { 'User-Agent': 'Real-DND-DM-Helper-Build/1.0' }
    }, (res) => {
      clearTimeout(timer);
      if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307 || res.statusCode === 308) {
        const next = res.headers.location;
        return get(next ? new URL(next, url).href : url).then(resolve).catch(reject);
      }
      resolve(res);
    });
    req.on('error', (err) => { clearTimeout(timer); reject(err); });
    const timer = setTimeout(() => {
      req.destroy(new Error('Connection timeout (check internet or firewall)'));
    }, CONNECT_TIMEOUT_MS);
  });
}

function download(url) {
  return get(url).then((res) => {
    if (res.statusCode !== 200) throw new Error('HTTP ' + res.statusCode);
    const file = fs.createWriteStream(OUT_FILE, { flags: 'w' });
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        res.destroy();
        file.destroy();
        reject(new Error('Download timeout (file too slow or connection stuck)'));
      }, DOWNLOAD_TIMEOUT_MS);
      res.pipe(file);
      file.on('finish', () => { clearTimeout(timer); file.close(); resolve(); });
      file.on('error', (err) => { clearTimeout(timer); reject(err); });
      res.on('error', (err) => { clearTimeout(timer); reject(err); });
    });
  });
}

if (!fs.existsSync(OLLAMA_DIR)) {
  fs.mkdirSync(OLLAMA_DIR, { recursive: true });
}

function useExistingFile() {
  const a = fs.existsSync(OUT_FILE) && fs.statSync(OUT_FILE).size >= MIN_SIZE_MB * 1024 * 1024;
  const b = fs.existsSync(OUT_FILE_ALT) && fs.statSync(OUT_FILE_ALT).size >= MIN_SIZE_MB * 1024 * 1024;
  if (a) {
    try { fs.copyFileSync(OUT_FILE, OUT_FILE_ALT); } catch (e) {}
    return true;
  }
  if (b) {
    try { fs.copyFileSync(OUT_FILE_ALT, OUT_FILE); } catch (e) {}
    return true;
  }
  return false;
}

if (useExistingFile()) {
  console.log('Using existing Ollama installer in ollama/ (already present).');
  process.exit(0);
}

console.log('Downloading Ollama Windows installer to ollama/ ...');
download(OLLAMA_URL)
  .then(() => {
    const stat = fs.statSync(OUT_FILE);
    console.log('Downloaded. Size:', Math.round(stat.size / 1024 / 1024) + ' MB');
    try {
      fs.copyFileSync(OUT_FILE, OUT_FILE_ALT);
      console.log('Also saved as OllamaSetup.exe for installer.');
    } catch (e) {
      console.warn('Could not copy to OllamaSetup.exe:', e.message);
    }
    console.log('Done. Ollama installer is ready to bundle.');
  })
  .catch((err) => {
    console.warn('Ollama download failed:', err.message);
    console.warn('Build will continue without bundled Ollama. Users can install from Options -> AI.');
    if (!fs.existsSync(OLLAMA_DIR)) fs.mkdirSync(OLLAMA_DIR, { recursive: true });
    const placeholder = path.join(OLLAMA_DIR, 'README.txt');
    try {
      fs.writeFileSync(placeholder, 'Ollama was not bundled. Users can install from https://ollama.com or use Options -> AI in the app.\n', 'utf8');
    } catch (e) {}
    process.exit(0);
  });
