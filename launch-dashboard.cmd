@echo off
setlocal
cd /d "%~dp0"

set PORT=5510
set PY_CMD=

where py >nul 2>&1
if %errorlevel%==0 set PY_CMD=py -3
if not defined PY_CMD (
  where python >nul 2>&1
  if %errorlevel%==0 set PY_CMD=python
)

if not defined PY_CMD (
  echo Python was not found. Opening index.html directly.
  start "" "%CD%\index.html"
  exit /b 0
)

set PORT_IN_USE=
for /f "tokens=5" %%a in ('netstat -ano ^| findstr /R /C:":%PORT% .*LISTENING"') do set PORT_IN_USE=1

if not defined PORT_IN_USE (
  start "IRA Dashboard Server" cmd /c "%PY_CMD% -m http.server %PORT% --bind 127.0.0.1"
  timeout /t 1 >nul
)

set URL=http://127.0.0.1:%PORT%/index.html?fresh=%RANDOM%%RANDOM%

where msedge >nul 2>&1
if %errorlevel%==0 (
  start "" msedge --app="%URL%"
) else (
  start "" "microsoft-edge:%URL%"
)

echo Dashboard launched at %URL%
echo To stop the local server later, run stop-dashboard-server.cmd
exit /b 0
