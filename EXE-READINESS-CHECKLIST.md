# Real DND DM Helper — EXE readiness checklist

Use this before releasing or handing off the installer.

## Prerequisites

- Node.js (LTS) installed
- `npm install` run in the project root
- index.html and srd-spells.js present in the project root

## Smoke test (before build)

1. **Run the app:** `npm run start`  
   - Window opens, title "Real DND DM Helper"
   - Campaign start screen or main grid visible
   - No console errors that block use

2. **Regression gate:** `npm run test:regression`  
   - Must pass (homebrew, migrations, undo, quest weights, dm_vault, desktop bridge, index.html entry).

## Build

1. Close any running Real DND DM Helper (or run `Close-Real-DND-DM-Helper.bat`).
2. Run **BUILD-EXE.bat** or `npm run dist`.
3. Confirm **Real-DND-DM-Helper-Setup-1.0.0.exe** appears in the project root and in `installer/`.

## Post-build verification

1. Run the installer; choose a short path (e.g. `C:\RealDMHelper\`) if you had "corrupt" issues before.
2. Launch "Real DND DM Helper" from Start Menu or desktop.
3. Quick checks: New campaign, generate one NPC, open Options → AI (Ollama status), open DM Helper AI.
4. Optional: Run `npm run cleanup-installer-duplicates` to keep only the canonical installer exe.

## Hosting updates (optional)

To enable in-app updates:

1. Host the contents of `installer/` (the installer exe and `latest.yml`) on a web server or GitHub Releases.
2. In `package.json`, set `build.publish.url` to that base URL.
3. Rebuild; new versions will check that URL for updates.

See **UPDATES.md** for details.
