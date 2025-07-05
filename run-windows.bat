@echo off
echo BizForm Guide 시작 중...
echo.

cd /d "C:\Users\LG\Desktop\법인관련 웹앱\bizform-guide"

echo 의존성 확인 중...
call npm install

echo.
echo 개발 서버 시작 중...
echo 브라우저가 자동으로 열립니다...
echo.

start http://localhost:5173/

call npm run dev

pause