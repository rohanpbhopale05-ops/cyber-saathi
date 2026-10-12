@echo off
title Cyber Saathi - Auto Push to GitHub
cd /d "%~dp0"
echo ====================================================
echo   CYBER SAATHI - AUTO GITHUB SYNC
echo   Any changes you make will automatically be pushed!
echo ====================================================
echo.
node scripts/auto-push.cjs
pause
