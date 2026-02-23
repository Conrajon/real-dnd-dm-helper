/**
 * Remove duplicate installer exes. Keeps only Real-DND-DM-Helper-Setup-{version}.exe
 * in the project root and in installer/. Run after build or anytime you see
 * multiple setup/installer files.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const pkgPath = path.join(root, 'package.json');
const installerDir = path.join(root, 'installer');

let version = '1.0.0';
try {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  if (pkg.version) version = pkg.version;
} catch (e) {}

const keepName = `Real-DND-DM-Helper-Setup-${version}.exe`;
const keepNameLower = keepName.toLowerCase();

function removeDuplicateExes(dir, label) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir, { withFileTypes: true });
  let removed = 0;
  for (const ent of files) {
    if (!ent.isFile() || !ent.name.toLowerCase().endsWith('.exe')) continue;
    const nameLower = ent.name.toLowerCase();
    if (nameLower === keepNameLower) continue;
    const full = path.join(dir, ent.name);
    try {
      fs.unlinkSync(full);
      console.log('[cleanup] Removed duplicate: ' + path.join(label, ent.name));
      removed++;
    } catch (e) {
      console.warn('[cleanup] Could not remove:', full, e.message);
    }
  }
  return removed;
}

let total = 0;
total += removeDuplicateExes(installerDir, 'installer') || 0;
total += removeDuplicateExes(root, 'root') || 0;

if (total > 0) {
  console.log('[cleanup] Kept only: ' + keepName + ' (removed ' + total + ' duplicate(s)).');
} else {
  console.log('[cleanup] No duplicate installer exes found. Kept: ' + keepName);
}
