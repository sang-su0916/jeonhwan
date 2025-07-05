@echo off
echo GitHub Push Script for Windows
echo ==============================
echo.

set /p TOKEN="GitHub Personal Access Token을 입력하세요: "

if "%TOKEN%"=="" (
    echo.
    echo Error: Token이 필요합니다!
    echo.
    echo Token 생성 방법:
    echo 1. https://github.com/settings/tokens 접속
    echo 2. 'Generate new token ^(classic^)' 클릭
    echo 3. 'repo' 권한 체크
    echo 4. 생성된 토큰 복사
    pause
    exit /b 1
)

echo.
echo GitHub에 푸시를 시작합니다...

git remote set-url origin https://sang-su0916:%TOKEN%@github.com/sang-su0916/beob-in.git
git push -u origin main

:: 보안을 위해 토큰 제거
git remote set-url origin https://github.com/sang-su0916/beob-in.git

echo.
echo 푸시가 완료되었습니다!
echo https://github.com/sang-su0916/beob-in 에서 확인하세요.
echo.
pause