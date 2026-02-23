# Updates

Editing the source in this folder does **not** change the installed app. To get your changes into the installed app:

1. Run **BUILD-EXE.bat** (or `npm run dist`) from the **Real DND DM Helper** project root.
2. Either run the new installer to reinstall, or use the in-app updater: **Options → About → Check for updates** (if you host `installer/latest.yml` and the installer exe on a server and set `build.publish.url` in `package.json`).

The built installer and `latest.yml` are written to the **installer/** folder. To enable in-app updates, host those files and set `build.publish.url` in `package.json` to that base URL.
