@echo off
setlocal
ssh -o StrictHostKeyChecking=accept-new -o ServerAliveInterval=30 -R 80:localhost:3002 nokey@localhost.run
