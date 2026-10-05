@echo off
setlocal
cd /d "%~dp0"
if errorlevel 1 goto failed
if /i "%~1"=="--check" goto check
echo Checking and syncing jichangnetwork.blog to GitHub...
where git >nul 2>nul
if errorlevel 1 goto missinggit
where node >nul 2>nul
if errorlevel 1 goto missingnode
call npm run build
if errorlevel 1 goto failed
call npm run check
if errorlevel 1 goto failed
git fetch origin
if errorlevel 1 goto failed
git rev-parse --verify HEAD >nul 2>nul
if not errorlevel 1 goto stage
git show-ref --verify --quiet refs/remotes/origin/main
if errorlevel 1 goto stage
echo First sync: attach remote history and keep all local website files.
git reset --mixed origin/main
if errorlevel 1 goto failed
:stage
git add --all
if errorlevel 1 goto failed
git diff --cached --quiet
if errorlevel 2 goto failed
if not errorlevel 1 goto push
git commit -m "Update jichangnetwork.blog website and content"
if errorlevel 1 goto failed
:push
git push -u origin main
if errorlevel 1 goto failed
echo.
echo SUCCESS: GitHub synchronization completed.
echo Domain and Pages deployment require separate verification.
pause
exit /b 0
:check
echo CHECK MODE: no commits, push, or credentials are accessed.
if not exist "scripts\build.mjs" exit /b 2
if not exist "package.json" exit /b 3
git --version
if errorlevel 1 exit /b 4
node --version
if errorlevel 1 exit /b 5
echo PASS: Windows batch file and project directory are readable.
exit /b 0
:missinggit
echo ERROR: Please install Git and run this file again.
pause
exit /b 1
:missingnode
echo ERROR: Please install Node.js 22 or newer and run this file again.
pause
exit /b 1
:failed
echo.
echo ERROR: Sync did not complete. Keep this window open.
echo Please send a picture of the last error lines for diagnosis.
echo No forced push is performed.
pause
exit /b 1
