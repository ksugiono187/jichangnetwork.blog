@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Please install Node.js 22 or newer, then run this file again.
  pause
  exit /b 1
)
node scripts/build.mjs
if errorlevel 1 (
  pause
  exit /b 1
)
echo Open http://localhost:4327 in your browser.
node scripts/serve.mjs
pause
