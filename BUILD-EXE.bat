@echo off
title Real DND DM Helper - Building installer
cd /d "%~dp0"

echo.
echo  Real DND DM Helper - Building installer and portable exe...
echo  The app UI is index.html in this folder. The installer packages this file only.
echo.

echo [1/3] Installing dependencies...
call npm install
if errorlevel 1 ( echo. & echo *** FAILED: npm install *** & pause & exit /b 1 )

echo.
echo [2/3] Preparing (Ollama download + HTML source)...
call node scripts/download-ollama.js
if errorlevel 1 ( echo. & echo *** FAILED: download-ollama *** & pause & exit /b 1 )
call node scripts/ensure-html-source.js
if errorlevel 1 ( echo. & echo *** FAILED: ensure-html-source - is index.html in this folder? *** & pause & exit /b 1 )

echo.
echo [3/3] Building installer and portable exe (may take 3-5 min first time)...
call npx --yes electron-builder --win --publish never
if errorlevel 1 ( echo. & echo *** FAILED: electron-builder *** & echo Scroll up to see the error. Common fixes: close any running Real DND DM Helper, run as Administrator once, or run: npm install & pause & exit /b 1 )

echo.
echo  Copying installer to this folder...
copy /Y "installer\Real-DND-DM-Helper-Setup-1.0.0.exe" "Real-DND-DM-Helper-Setup-1.0.0.exe" >nul 2>&1
if errorlevel 1 copy /Y "installer\Real DND DM Helper Setup 1.0.0.exe" "Real-DND-DM-Helper-Setup-1.0.0.exe" >nul 2>&1
if errorlevel 1 copy /Y "installer\Real DND DM Helper Installer 1.0.0.exe" "Real-DND-DM-Helper-Setup-1.0.0.exe" >nul 2>&1

echo.
echo  Done.
echo    - Installer: Real-DND-DM-Helper-Setup-1.0.0.exe  (give this to users; no spaces = fewer "corrupt" errors)
echo    - installer folder: exe + portable + latest.yml (for in-app updates; see UPDATES.md)
echo.
dir /b "Real-DND-DM-Helper-Setup-1.0.0.exe" 2>nul
dir /b installer\*.exe 2>nul
dir /b installer\latest.yml 2>nul
echo.
pause
