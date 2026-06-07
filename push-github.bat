@echo off
cd /d "%~dp0"

echo.
echo ========================================
echo   Push nouveaux fichiers vers GitHub
echo ========================================
echo.

git add .
git commit -m "feat: page Unreal Engine 5 avec 3 videos YouTube + carousel cliquable"
git push origin main

echo.
echo ========================================
echo   DONE ! Vercel se redeploie auto.
echo ========================================
echo.
pause
