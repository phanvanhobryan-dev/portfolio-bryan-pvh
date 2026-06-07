@echo off
cd /d "%~dp0"

echo.
echo ========================================
echo   Push vers GitHub
echo ========================================
echo.

git add .
git commit -m "refactor: pages projets séparées (Canal, Disney, DigitalEvent)"
git push origin main

echo.
echo ========================================
echo   DONE ! Vercel se redeploie auto.
echo ========================================
echo.
pause
