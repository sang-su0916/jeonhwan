@echo off
chcp 65001 > nul
echo.
echo GitHub Push to jeonhwan repository
echo ==================================
echo.

set /p TOKEN=Enter GitHub Token: 

if "%TOKEN%"=="" (
    echo.
    echo ERROR: Token is required!
    pause
    exit /b 1
)

echo.
echo Setting up Git...
git config user.email "sang-su0916@github.com"
git config user.name "sang-su0916"

echo.
echo Pushing to GitHub...
git remote set-url origin https://sang-su0916:%TOKEN%@github.com/sang-su0916/jeonhwan.git

git push -u origin main --force

if errorlevel 1 (
    echo.
    echo Trying with master branch...
    git push -u origin master --force
)

git remote set-url origin https://github.com/sang-su0916/jeonhwan.git

echo.
echo ===============================
echo Push completed!
echo Check: https://github.com/sang-su0916/jeonhwan
echo ===============================
echo.
pause