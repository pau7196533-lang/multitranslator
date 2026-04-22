@echo off
setlocal
set "ROOT=%~dp0"
powershell.exe -ExecutionPolicy Bypass -File "%ROOT%scripts\serve-static-demo.ps1" 1>"%ROOT%logs\demo-server.out.log" 2>"%ROOT%logs\demo-server.err.log"
