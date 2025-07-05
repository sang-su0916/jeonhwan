@echo off
chcp 65001 > nul

echo Fixing Git permissions...
git config --global --add safe.directory "C:/Users/LG/Desktop/법인관련 웹앱/bizform-guide"

echo.
echo Adding files...
git add .

echo.
echo Creating commit...
git commit -m "Upload BizForm Guide project" 2>nul

echo.
set /p TOKEN=Enter GitHub Token: 

echo.
echo Pushing to GitHub...
git remote set-url origin https://sang-su0916:%TOKEN%@github.com/sang-su0916/beob-in.git
git push -u origin main

if errorlevel 1 (
    echo.
    echo Trying with master branch...
    git push -u origin master
)

git remote set-url origin https://github.com/sang-su0916/beob-in.git

echo.
echo Done! Check: https://github.com/sang-su0916/beob-in
pause