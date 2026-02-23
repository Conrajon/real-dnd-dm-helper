@echo off
REM ═══════════════════════════════════════════════════════════
REM  Real DND DM Helper — Release a new version
REM  This script bumps the version, builds, and publishes
REM  to GitHub Releases so the in-game updater can find it.
REM ═══════════════════════════════════════════════════════════

echo.
echo  ============================================
echo   Real DND DM Helper — Release Builder
echo  ============================================
echo.

REM Check for GH_TOKEN
if "%GH_TOKEN%"=="" (
    echo [!] GH_TOKEN environment variable is not set.
    echo     You need a GitHub Personal Access Token to publish releases.
    echo.
    echo     1. Go to: https://github.com/settings/tokens
    echo     2. Click "Generate new token (classic)"
    echo     3. Give it a name like "DND DM Helper Releases"
    echo     4. Check the "repo" scope (full control of private repositories)
    echo     5. Click "Generate token" and copy the token
    echo     6. Run:  set GH_TOKEN=your_token_here
    echo     7. Then run this script again
    echo.
    pause
    exit /b 1
)

REM Ask what kind of version bump
echo Current version:
node -e "console.log(require('./package.json').version)"
echo.
echo What kind of release?
echo   1 = patch  (1.0.0 -> 1.0.1)  — bug fixes
echo   2 = minor  (1.0.0 -> 1.1.0)  — new features
echo   3 = major  (1.0.0 -> 2.0.0)  — breaking changes
echo.
set /p BUMP_TYPE="Enter 1, 2, or 3: "

if "%BUMP_TYPE%"=="1" (
    echo Bumping patch version...
    npm version patch --no-git-tag-version
) else if "%BUMP_TYPE%"=="2" (
    echo Bumping minor version...
    npm version minor --no-git-tag-version
) else if "%BUMP_TYPE%"=="3" (
    echo Bumping major version...
    npm version major --no-git-tag-version
) else (
    echo Invalid choice. Exiting.
    pause
    exit /b 1
)

echo.
echo New version:
node -e "console.log(require('./package.json').version)"
echo.

REM Build and publish
echo Building and publishing to GitHub Releases...
echo This may take a few minutes...
echo.
call npm run release

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Build/publish failed. Check the output above.
    pause
    exit /b 1
)

REM Git commit and tag
set /p NEW_VER=<nul
for /f %%i in ('node -e "console.log(require('./package.json').version)"') do set NEW_VER=%%i

echo.
echo Build complete! Publishing v%NEW_VER%...
echo.

git add -A
git commit -m "Release v%NEW_VER%"
git tag "v%NEW_VER%"
git push origin main --tags

echo.
echo  ============================================
echo   Release v%NEW_VER% published successfully!
echo   Users will see the update in-game.
echo  ============================================
echo.
pause
