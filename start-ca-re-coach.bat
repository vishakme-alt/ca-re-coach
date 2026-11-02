@echo off
rem Local-only launcher: serves the static build on 127.0.0.1 only.
cd /d "%~dp0"
if not exist "out" call npm run build
start "" http://localhost:3000
npx --yes serve@14 out -l tcp://127.0.0.1:3000
