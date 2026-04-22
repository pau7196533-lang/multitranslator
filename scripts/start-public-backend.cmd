@echo off
setlocal
set "ROOT=%~dp0.."
set "PORT=3002"
set "HTTPS=false"
set "PUBLIC_BASE_URL="
set "FRONTEND_BASE_URL=https://pau7196533-lang.github.io/multitranslator/public/"
set "CORS_ORIGIN=https://pau7196533-lang.github.io,https://mulittranslator.netlify.app"
cd /d "%ROOT%"
node server.js
