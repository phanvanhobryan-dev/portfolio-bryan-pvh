@echo off
cd /d "%~dp0"

echo.
echo ========================================
echo   Push vers GitHub
echo ========================================
echo.

git add .
git commit -m "feat: 3 mini-projets carousel (Mountains, Retroverse, CanalLive) avec pages dédiées"
git push origin main

echo.
echo ========================================
echo   DONE ! Vercel se redeploie auto.
echo ========================================
echo.
pause
