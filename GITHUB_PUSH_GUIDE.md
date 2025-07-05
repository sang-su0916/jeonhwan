# 🚀 GitHub 푸시 가이드

## 준비사항 체크 ✅

- [x] Git 저장소 초기화 완료
- [x] 모든 파일 커밋 완료 
- [x] Remote 설정 완료
- [ ] GitHub Personal Access Token 필요

## 🔑 Step 1: GitHub Token 생성

1. **GitHub 로그인**
2. **토큰 생성 페이지 접속**: https://github.com/settings/tokens
3. **"Generate new token (classic)"** 클릭
4. **설정**:
   - Note: `BizForm Guide Push`
   - Expiration: `30 days` (또는 원하는 기간)
   - Scopes: ✅ `repo` (전체 체크)
5. **"Generate token"** 클릭
6. **⚠️ 토큰 복사** (한 번만 보여집니다!)

## 📤 Step 2: 푸시 실행

### 방법 1: Windows 사용자 (권장)
```cmd
# 명령 프롬프트 또는 PowerShell에서
cd "C:\Users\LG\Desktop\법인관련 웹앱\bizform-guide"
push_windows.bat
```
토큰 입력 후 자동으로 푸시됩니다.

### 방법 2: Git Bash 사용자
```bash
cd "/mnt/c/Users/LG/Desktop/법인관련 웹앱/bizform-guide"
./auto_push.sh [your-token-here]
```

### 방법 3: 수동 푸시
```bash
cd "/mnt/c/Users/LG/Desktop/법인관련 웹앱/bizform-guide"
git push -u origin main
```
- Username: `sang-su0916`
- Password: `[GitHub Token]`

## 🎯 Step 3: 확인

1. **저장소 확인**: https://github.com/sang-su0916/beob-in
2. **Actions 탭**에서 배포 상태 확인 (CI/CD 설정 시)

## 🛠 문제 해결

### "repository not found" 에러
```bash
# 저장소 URL 확인
git remote -v

# 필요시 URL 수정
git remote set-url origin https://github.com/sang-su0916/beob-in.git
```

### "authentication failed" 에러
- 토큰이 올바른지 확인
- 토큰에 `repo` 권한이 있는지 확인
- 토큰이 만료되지 않았는지 확인

### 대용량 파일 에러
```bash
# .gitignore 확인
cat .gitignore

# 캐시 정리
git rm -r --cached node_modules
git commit -m "Remove node_modules"
```

## 📝 푸시 후 할 일

1. **README 업데이트**: 프로젝트 설명 추가
2. **About 섹션**: 저장소 설명 추가
3. **Topics**: `react`, `typescript`, `firebase` 등 추가
4. **GitHub Pages**: 배포 설정 (선택사항)

## 🔒 보안 주의사항

- ❌ 토큰을 코드에 하드코딩하지 마세요
- ❌ 토큰을 공유하지 마세요
- ✅ 사용 후 토큰을 안전하게 보관하세요
- ✅ 필요시 토큰을 재생성하세요

---

준비가 완료되었습니다! 위 가이드를 따라 GitHub에 푸시하세요. 🎉