# BizForm Guide 문제 해결 가이드

## 🚨 현재 주요 문제

### 1. 개발 서버 실행 불가
**증상**: `npm run dev` 실행 시 포트 충돌 또는 서버 시작 실패

**해결 방법**:
```powershell
# 1단계: 기존 Node.js 프로세스 모두 종료
taskkill /F /IM node.exe

# 2단계: 프로젝트 폴더로 이동 후 서버 시작
cd "C:\Users\LG\Desktop\법인관련 웹앱\bizform-guide"
npm run dev

# 3단계: 포트 충돌 시 다른 포트 사용
npm run dev -- --port 5175
```

### 2. PowerShell 명령어 오류
**증상**: `&&` 연산자 사용 시 오류 발생

**해결 방법**:
```powershell
# ❌ 잘못된 방법
cd bizform-guide && npm run dev

# ✅ 올바른 방법
cd "C:\Users\LG\Desktop\법인관련 웹앱\bizform-guide" ; npm run dev
```

### 3. 디렉토리 위치 문제
**증상**: `npm error Missing script: "dev"`

**원인**: 상위 폴더에서 명령어 실행
**해결 방법**: 반드시 프로젝트 폴더 내에서 실행

```powershell
# 현재 위치 확인
pwd

# 올바른 위치: C:\Users\LG\Desktop\법인관련 웹앱\bizform-guide
# 잘못된 위치: C:\Users\LG\Desktop\법인관련 웹앱
```

## 🔧 단계별 해결 절차

### 1단계: 환경 확인
```powershell
# 현재 디렉토리 확인
pwd

# 프로젝트 파일 존재 확인
ls package.json
```

### 2단계: 프로세스 정리
```powershell
# Node.js 프로세스 종료
taskkill /F /IM node.exe

# 포트 사용 확인 (선택사항)
netstat -ano | findstr :5174
```

### 3단계: 서버 시작
```powershell
# 기본 포트로 시작
cd "C:\Users\LG\Desktop\법인관련 웹앱\bizform-guide" ; npm run dev

# 포트 충돌 시 대체 포트 사용
cd "C:\Users\LG\Desktop\법인관련 웹앱\bizform-guide" ; npm run dev -- --port 5175
```

### 4단계: 브라우저 접속
- 기본: `http://localhost:5174`
- 대체: `http://localhost:5175`

## 🔍 디버깅 팁

### 로그 확인
```powershell
# npm 로그 확인
npm run dev --verbose

# Vite 로그 확인
npm run dev -- --debug
```

### 의존성 문제 해결
```powershell
# node_modules 재설치
rm -rf node_modules
npm install

# 캐시 정리
npm cache clean --force
```

## 📋 체크리스트

### 서버 시작 전 확인사항
- [ ] 올바른 프로젝트 폴더에 있는가?
- [ ] package.json 파일이 존재하는가?
- [ ] .env 파일이 존재하는가?
- [ ] node_modules 폴더가 존재하는가?

### 오류 발생 시 확인사항
- [ ] 다른 Node.js 프로세스가 실행 중인가?
- [ ] 포트가 이미 사용 중인가?
- [ ] PowerShell 명령어 문법이 올바른가?
- [ ] 프로젝트 경로에 한글이 포함되어 문제가 있는가?

## 🆘 최종 해결책

모든 방법이 실패할 경우:

1. **컴퓨터 재부팅**
2. **새로운 포트 사용**: `--port 3000`
3. **프로젝트 재설치**:
   ```powershell
   cd "C:\Users\LG\Desktop\법인관련 웹앱\bizform-guide"
   rm -rf node_modules
   npm install
   npm run dev
   ```

## 📞 클로드코드 작업 시 참고사항

1. **현재 상태**: 모든 컴포넌트와 설정 완료, 서버 실행만 문제
2. **우선순위**: 개발 서버 안정화가 최우선
3. **테스트 방법**: 서버 시작 후 `http://localhost:5174` 접속
4. **성공 지표**: BizForm Guide 홈페이지 정상 표시 