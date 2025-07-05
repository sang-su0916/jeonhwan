# 🚀 BizForm Guide 빠른 시작 가이드

## 📍 현재 상황 요약
- **프로젝트**: 법인 설립 지원 서비스 웹앱 (React + Firebase)
- **상태**: 개발 완료, 서버 실행 문제만 남음
- **문제**: 포트 충돌로 인한 개발 서버 실행 불가

## ⚡ 즉시 실행 명령어

### 1. 기존 프로세스 종료
```powershell
taskkill /F /IM node.exe
```

### 2. 서버 시작 (하나씩 시도)
```powershell
# 방법 1: 기본 포트
cd "C:\Users\LG\Desktop\법인관련 웹앱\bizform-guide" ; npm run dev

# 방법 2: 대체 포트
cd "C:\Users\LG\Desktop\법인관련 웹앱\bizform-guide" ; npm run dev -- --port 5175

# 방법 3: 안전한 포트
cd "C:\Users\LG\Desktop\법인관련 웹앱\bizform-guide" ; npm run dev -- --port 3000
```

### 3. 브라우저 접속
- `http://localhost:5174` (기본)
- `http://localhost:5175` (대체)
- `http://localhost:3000` (안전)

## 🎯 성공 확인 방법
브라우저에서 다음이 표시되면 성공:
- **BizForm Guide** 제목
- **법인 설립의 모든 과정을 간편하게** 부제목
- 3개의 기능 카드 (맞춤형 추천, 체크리스트, 문서 생성)
- 온보딩 시작, 대시보드 보기 버튼

## 🔧 문제 발생 시
1. **포트 충돌**: 다른 포트 사용 (`--port 3000`)
2. **명령어 오류**: PowerShell에서 `&&` 대신 `;` 사용
3. **디렉토리 오류**: 반드시 프로젝트 폴더 내에서 실행
4. **의존성 문제**: `npm install` 재실행

## 📁 프로젝트 구조
```
bizform-guide/
├── src/
│   ├── components/     # 재사용 컴포넌트
│   ├── pages/         # 페이지 컴포넌트
│   ├── contexts/      # React Context
│   └── lib/           # Firebase 설정
├── .env               # 환경 변수
└── package.json       # 프로젝트 설정
```

## 🔥 Firebase 설정 완료
- 프로젝트: jeonhwan-biz
- 인증: Google, 이메일/비밀번호
- 환경 변수: 모두 설정 완료

## 📋 클로드코드 작업 시 체크리스트
- [ ] 개발 서버 정상 실행 확인
- [ ] 브라우저에서 홈페이지 로드 확인
- [ ] Firebase 인증 기능 테스트
- [ ] 각 페이지 라우팅 확인
- [ ] 반응형 디자인 확인

## 🆘 긴급 연락처
문제 발생 시 `PROJECT_STATUS.md`와 `TROUBLESHOOTING.md` 참고 