# Real DND DM Helper

A **production-ready desktop app** for D&D 5e Dungeon Masters: generate NPCs, quests, encounters, battle maps, and run sessions with party tracking, initiative, Live DM Tools, and **local AI** (Ollama) for story generation and rules help.

This project is a clean, professional rebuild of the DND DM Helper tool — same features, clearer structure, and ready for live use.

---

## Quick start

```bash
npm install
npm run start
```

Runs the app in development (Electron). The app UI is **`index.html`** in this folder. Edit this file to change the app; the installer packages it.

---

## Build the Windows installer

**Easiest:** Double-click **`BUILD-EXE.bat`** in this folder. It runs `npm install`, downloads Ollama (optional), and builds the installer. Output: **`Real-DND-DM-Helper-Setup-1.0.0.exe`** (in this folder and in `installer/`).

**Manual:**

1. `npm install`
2. `npm run dist` — creates the installer in `installer/`
3. Give users **`Real-DND-DM-Helper-Setup-1.0.0.exe`** (single file; no Node or browser required).

---

## Features

- **Campaigns** — New / Open / Save; campaign name and save in header
- **NPC generation** — Race, class, level, boss mode; batch generate; NPC cards (stats, portrait, spells, equipment); relatives, disciples, shopkeepers, travelling merchant bodyguards, revenge quest NPCs
- **Quests** — Random, side, full, nemesis; location weighting; saved quests; kill-quest modal
- **Encounters** — Calculator (party size/level, enemy count/CR); random encounter generator
- **Battle maps** — Generate for quest or boss; print; detail levels
- **Party tracking** — Players, health strips, party modal, player sheets
- **Live DM tools** — Roll log, dice formula, spell list (search, level filter, favorites), workflow kickoff, undo, readiness check, diagnostics export
- **DM Helper AI** — Chat for rules/questions via Ollama (main process)
- **Story generation** — AI-generated story content (Ollama); 3‑minute timeout
- **Bounty board** — Bounties, generate from bounty, wanted poster
- **Session notes** — Notes popout; vault storage
- **Sound board** — Categories, volume, upload audio
- **Homebrew** — Import with preview and dry-run diagnostics
- **Options** — Display (theme, reduced motion), AI (Ollama URL, model, install/pull/test), About (version, updates)

---

## AI (Ollama)

- **Options → AI**: Set Ollama URL (default `http://127.0.0.1:11434`), choose model, Install/Download Ollama, Pull model with progress, Test.
- The app tries to start Ollama automatically when you open it.
- If you bundle the Ollama installer (run `npm run dist` — it downloads into `ollama/`), the built installer can offer to install Ollama so AI works right away.

---

## Tests

Before releasing, run the regression gate:

```bash
npm run test:regression
```

---

## Project layout

| Path | Purpose |
|------|--------|
| **index.html** | Main app — all UI and logic. Single file to edit. |
| **main.js** | Electron main (window, app:// protocol, Ollama, updates). |
| **preload.js** | Context bridge (desktopApp API). |
| **srd-spells.js** | D&D SRD spell data (required). |
| **scripts/** | download-ollama, ensure-html-source, regression-smoke, cleanup-installer-duplicates. |
| **build/** | NSIS custom (installer.nsh). |
| **ollama/** | Optional: OllamaSetup.exe here to bundle with installer. |
| **installer/** | Build output (installer exe, latest.yml, win-unpacked). |

See **FOLDER-CONTENTS.txt** for a short reference of every file and folder.

---

## Tech

- **Electron** — desktop shell
- **electron-builder** — Windows NSIS installer
- **electron-updater** — in-app updates (when publish URL is set)
- Single HTML app (no separate front-end build); `app://` protocol for reliable loading of index.html and srd-spells.js

---

## Release checklist

See **EXE-READINESS-CHECKLIST.md** for prerequisites, smoke tests, build steps, and release verification.
