/**
 * Auto-publish script: bumps version, updates changelog, commits, tags, and pushes.
 * Usage: node scripts/publish.js [patch|minor|major] ["change1" "change2" ...]
 * 
 * Examples:
 *   node scripts/publish.js                                           → 1.0.0 → 1.0.1 (patch)
 *   node scripts/publish.js minor "New shop system" "Bug fixes"       → 1.0.0 → 1.1.0
 *   node scripts/publish.js major "Complete rewrite"                  → 1.0.0 → 2.0.0
 *   node scripts/publish.js patch                                     → auto-generates changelog from git
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const pkgPath = path.join(ROOT, 'package.json');
const htmlPath = path.join(ROOT, 'index.html');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

const bumpType = (process.argv[2] || 'patch').toLowerCase();
const changelogArgs = process.argv.slice(3);

// Parse current version
const parts = pkg.version.split('.').map(Number);
if (bumpType === 'major') { parts[0]++; parts[1] = 0; parts[2] = 0; }
else if (bumpType === 'minor') { parts[0] = parts[0]; parts[1]++; parts[2] = 0; }
else { parts[2]++; } // patch

const newVersion = parts.join('.');
const tag = 'v' + newVersion;

// Build changelog entries
let changes = changelogArgs.filter(c => c.trim());
if (changes.length === 0) {
    // Auto-generate from recent git commits since last tag
    try {
        const lastTag = execSync('git describe --tags --abbrev=0 2>nul || echo ""', { cwd: ROOT, encoding: 'utf8' }).trim();
        const range = lastTag ? (lastTag + '..HEAD') : 'HEAD~10..HEAD';
        const log = execSync('git log ' + range + ' --pretty=format:"%s" --no-merges', { cwd: ROOT, encoding: 'utf8' }).trim();
        if (log) changes = log.split('\n').map(l => l.replace(/^["']|["']$/g, '').trim()).filter(Boolean);
    } catch(_) {}
    if (changes.length === 0) changes = ['Bug fixes and improvements'];
}

const commitMsg = 'Release ' + tag + ': ' + changes[0];

console.log('');
console.log('  Current version: ' + pkg.version);
console.log('  New version:     ' + newVersion + ' (' + bumpType + ')');
console.log('  Tag:             ' + tag);
console.log('  Changelog:');
changes.forEach(c => console.log('    - ' + c));
console.log('');

// 1. Update package.json
pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
console.log('[1/5] Updated package.json to ' + newVersion);

// 2. Inject changelog into index.html APP_CHANGELOG
let html = fs.readFileSync(htmlPath, 'utf8');
const marker = 'var APP_CHANGELOG = {';
const markerIdx = html.indexOf(marker);
if (markerIdx !== -1) {
    const insertPos = markerIdx + marker.length;
    const entriesStr = changes.map(c => '        "' + c.replace(/"/g, '\\"') + '"').join(',\n');
    const newEntry = '\n    "' + newVersion + '": [\n' + entriesStr + '\n    ],';
    html = html.slice(0, insertPos) + newEntry + html.slice(insertPos);
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('[2/5] Injected changelog for ' + newVersion + ' into index.html');
} else {
    console.log('[2/5] WARNING: Could not find APP_CHANGELOG in index.html — skipping changelog injection');
}

// 3. Git add all
execSync('git add -A', { stdio: 'inherit', cwd: ROOT });
console.log('[3/5] Staged all changes');

// 4. Git commit
execSync('git commit -m "' + commitMsg.replace(/"/g, '\\"') + '"', { stdio: 'inherit', cwd: ROOT });
console.log('[4/5] Committed: ' + commitMsg);

// 5. Git tag + push
execSync('git tag ' + tag, { stdio: 'inherit', cwd: ROOT });
execSync('git push && git push --tags', { stdio: 'inherit', cwd: ROOT });
console.log('[5/5] Pushed to GitHub with tag ' + tag);

console.log('');
console.log('  Done! GitHub Actions will now build and publish ' + tag);
console.log('  Users will see the "What\'s New" popup with your changelog.');
console.log('  Monitor at: https://github.com/Conrajon/real-dnd-dm-helper/actions');
console.log('');
