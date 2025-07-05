@echo off
chcp 65001 > nul
echo.
echo GitHub Push Script
echo ==================
echo.

set /p TOKEN=Enter GitHub Token: 

if "%TOKEN%"=="" (
    echo.
    echo ERROR: Token is required!
    echo.
    echo How to create token:
    echo 1. Go to https://github.com/settings/tokens
    echo 2. Click "Generate new token (classic)"
    echo 3. Check "repo" permission
    echo 4. Copy the generated token
    pause
    exit /b 1
)

echo.
echo Pushing to GitHub...

git remote set-url origin https://sang-su0916:%TOKEN%@github.com/sang-su0916/beob-in.git
git push -u origin main

git remote set-url origin https://github.com/sang-su0916/beob-in.git

echo.
echo Push completed!
echo Check your repository at: https://github.com/sang-su0916/beob-in
echo.
pause