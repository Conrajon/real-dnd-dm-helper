/**
 * Single source of truth: index.html in the project root.
 * Run before building so the installer always packages this file (no stale copy).
 * Cleans installer output so the next pack is fresh and matches your HTML.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const HTML_FILE = path.join(ROOT, 'index.html');
const SRD_SPELLS = path.join(ROOT, 'srd-spells.js');
const INSTALLER_DIR = path.join(ROOT, 'installer');

if (!fs.existsSync(HTML_FILE)) {
  console.error('index.html not found in project root. It is the only app UI; create or restore it.');
  process.exit(1);
}
if (!fs.existsSync(SRD_SPELLS)) {
  console.error('srd-spells.js not found in project root. The app and build require this file.');
  process.exit(1);
}

if (fs.existsSync(INSTALLER_DIR)) {
  try {
    fs.rmSync(INSTALLER_DIR, { recursive: true });
    fs.mkdirSync(INSTALLER_DIR, { recursive: true });
    console.log('Cleaned installer/ for a fresh build (avoids corrupt or stale files).');
  } catch (e) {
    console.warn('Could not clean installer/:', e.message);
  }
}

console.log('Source UI: index.html (installer will package this file)');
console.log('After editing the HTML, run BUILD-EXE.bat again so the new installer includes your changes.');
process.exit(0);
