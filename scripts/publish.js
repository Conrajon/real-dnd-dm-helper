/**
 * Auto-publish script: bumps version, commits, tags, and pushes.
 * Usage: node scripts/publish.js [patch|minor|major] ["optional commit message"]
 * 
 * Examples:
 *   node scripts/publish.js              → 1.0.0 → 1.0.1 (patch by default)
 *   node scripts/publish.js minor        → 1.0.0 → 1.1.0
 *   node scripts/publish.js major        → 1.0.0 → 2.0.0
 *   node scripts/publish.js patch "Fixed bug with loot generation"
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const pkgPath = path.join(__dirname, '..', 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const bumpType = (process.argv[2] || 'patch').toLowerCase();
const customMessage = process.argv[3] || '';

// Parse current version
const parts = pkg.version.split('.').map(Number);
if (bumpType === 'major') { parts[0]++; parts[1] = 0; parts[2] = 0; }
else if (bumpType === 'minor') { parts[0] = parts[0]; parts[1]++; parts[2] = 0; }
else { parts[2]++; } // patch

const newVersion = parts.join('.');
const tag = 'v' + newVersion;
const commitMsg = customMessage || ('Release ' + tag);

console.log('');
console.log('  Current version: ' + pkg.version);
console.log('  New version:     ' + newVersion + ' (' + bumpType + ')');
console.log('  Tag:             ' + tag);
console.log('  Message:         ' + commitMsg);
console.log('');

// 1. Update package.json
pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
console.log('[1/4] Updated package.json to ' + newVersion);

// 2. Git add all
execSync('git add -A', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
console.log('[2/4] Staged all changes');

// 3. Git commit
execSync('git commit -m "' + commitMsg.replace(/"/g, '\\"') + '"', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
console.log('[3/4] Committed: ' + commitMsg);

// 4. Git tag + push
execSync('git tag ' + tag, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
execSync('git push && git push --tags', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
console.log('[4/4] Pushed to GitHub with tag ' + tag);

console.log('');
console.log('  Done! GitHub Actions will now build and publish ' + tag);
console.log('  Monitor at: https://github.com/Conrajon/real-dnd-dm-helper/actions');
console.log('');
