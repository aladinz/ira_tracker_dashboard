@echo off
setlocal
set PORT=5510
set FOUND=

for /f "tokens=5" %%a in ('netstat -ano ^| findstr /R /C:":%PORT% .*LISTENING"') do (
  set FOUND=1
  taskkill /PID %%a /F >nul 2>&1
)

if defined FOUND (
  echo Stopped dashboard server on port %PORT%.
) else (
  echo No dashboard server found on port %PORT%.
)

exit /b 0
