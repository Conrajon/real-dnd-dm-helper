@echo off
title Close Real DND DM Helper
taskkill /F /IM "Real DND DM Helper.exe" 2>nul
taskkill /F /IM "Real-DND-DM-Helper.exe" 2>nul
for /f "tokens=2" %%a in ('tasklist /fi "windowtitle eq Real DND DM Helper*" /v /nh 2^>nul') do taskkill /F /PID %%a 2>nul
echo If the app or installer was running, it should be closed. You can now rebuild or install.
pause
