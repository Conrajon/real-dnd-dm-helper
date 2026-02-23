/**
 * Regression smoke tests for Real DND DM Helper.
 * Asserts presence of critical features in index.html, preload.js, main.js.
 */
const fs = require('fs');
const path = require('path');

const root = process.cwd();

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8');
}

function assertMatch(haystack, regex, label) {
  if (!regex.test(haystack)) {
    throw new Error('Missing regression marker: ' + label);
  }
}

function run() {
  const html = read('index.html');
  const preload = read('preload.js');
  const main = read('main.js');

  // Homebrew preview + dry-run diagnostics
  assertMatch(html, /hbPreviewImportFromText\s*=\s*async\s*function/, 'homebrew preview import function');
  assertMatch(html, /hbApplyPreviewImport\s*=\s*function/, 'homebrew apply preview function');
  assertMatch(html, /id="hbPreviewPanel"/, 'homebrew diagnostics panel markup');
  assertMatch(html, /function\s+hbDryRunDiagnostics\s*\(/, 'homebrew dry-run diagnostics logic');

  // LocalStorage schema migration
  assertMatch(html, /DM_SCHEMA_VERSION_KEY\s*=\s*['"]dm_schema_version['"]/, 'schema version storage key');
  assertMatch(html, /function\s+dmRunStorageMigrations\s*\(/, 'schema migration function');
  assertMatch(html, /dmRunStorageMigrations\(\);/, 'schema migration boot invocation');

  // Undo / rollback baseline
  assertMatch(html, /function\s+dmPushUndoAction\s*\(/, 'undo stack push');
  assertMatch(html, /function\s+dmUndoLastAction\s*\(/, 'undo stack pop');
  assertMatch(html, /dmPushUndoAction\('Delete quest'/, 'quest delete undo');
  assertMatch(html, /dmPushUndoAction\('Delete bounty'/, 'bounty delete undo');
  assertMatch(html, /dmPushUndoAction\('Clear saved NPC vault'/, 'vault clear undo');

  // Quest-type-specific location weighting
  assertMatch(html, /var\s+qWeights\s*=\s*\{[\s\S]*horror_hunt/s, 'quest weighting map');
  assertMatch(html, /weightedPool\.push\(k\);[\s\S]*weightedPool\.push\(k\);/s, 'weighted pool multiplier');

  // Long session performance pass
  assertMatch(html, /function\s+dmStartLongSessionPerformancePass\s*\(/, 'long-session perf pass');
  assertMatch(html, /_rollHistory\.length\s*=\s*120/, 'roll history trimming');

  // DM workflow QoL controls
  assertMatch(html, /dmWorkflowKickoff\s*\(/, 'workflow kickoff function');
  assertMatch(html, /onclick="dmUndoLastAction\(\)"/, 'undo button in DM tools');

  // Desktop diagnostics and update check
  assertMatch(preload, /getBuildInfo\s*:\s*\(\)\s*=>\s*ipcRenderer\.invoke\('app:getBuildInfo'\)/, 'preload build info bridge');
  assertMatch(preload, /checkForUpdates\s*:\s*\(\)\s*=>\s*ipcRenderer\.invoke\('app:checkForUpdates'\)/, 'preload checkForUpdates bridge');
  assertMatch(main, /ipcMain\.handle\('app:getBuildInfo'/, 'main process build info handler');
  assertMatch(main, /ipcMain\.handle\('app:checkForUpdates'/, 'main process checkForUpdates handler');

  // Notes NPC list must use dm_vault (not npcVault)
  assertMatch(html, /localStorage\.getItem\s*\(\s*['"]dm_vault['"]\s*\)/, 'notes/vault use dm_vault');
  if (/localStorage\.getItem\s*\(\s*['"]npcVault['"]\s*\)/.test(html)) {
    throw new Error('Regression: notes must not use npcVault; use dm_vault for saved NPC list');
  }

  // App loads index.html
  assertMatch(main, /UI_ENTRY_FILE\s*=\s*['"]index\.html['"]/, 'main loads index.html');

  console.log('Regression smoke checks passed.');
}

try {
  run();
} catch (err) {
  console.error(err.message || err);
  process.exit(1);
}
