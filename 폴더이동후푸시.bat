@echo off
chcp 65001 > nul

echo Creating new folder and copying files...

:: 새 폴더 생성
cd "C:\Users\LG\Desktop"
mkdir jeonhwan-project
cd jeonhwan-project

:: 파일 복사
xcopy "C:\Users\LG\Desktop\법인관련 웹앱\bizform-guide\*" . /E /H /Y

:: Git 초기화
git init
git add .
git commit -m "Initial commit: BizForm Guide project"

:: GitHub에 푸시
set /p TOKEN=Enter GitHub Token: 

git remote add origin https://sang-su0916:%TOKEN%@github.com/sang-su0916/jeonhwan.git
git branch -M main
git push -u origin main

echo.
echo Completed! Check: https://github.com/sang-su0916/jeonhwan
pause