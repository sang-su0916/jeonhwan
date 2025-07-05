# GitHub 푸시 방법

이미 프로젝트가 준비되어 있습니다. 다음 방법 중 하나를 선택하세요:

## 방법 1: Personal Access Token 사용 (권장)

1. GitHub에 로그인
2. Settings → Developer settings → Personal access tokens → Tokens (classic)
3. "Generate new token" 클릭
4. 권한 설정:
   - `repo` (전체 선택)
   - `workflow` (선택사항)
5. 토큰 생성 후 복사 (한 번만 보여집니다!)

6. 터미널에서 실행:
```bash
cd "/mnt/c/Users/LG/Desktop/법인관련 웹앱/bizform-guide"
git push -u origin main
```

7. 인증 정보 입력:
   - Username: `sang-su0916`
   - Password: `[복사한 토큰 붙여넣기]`

## 방법 2: GitHub Desktop 사용

1. [GitHub Desktop](https://desktop.github.com/) 다운로드 및 설치
2. File → Add Local Repository
3. 프로젝트 폴더 선택: `C:\Users\LG\Desktop\법인관련 웹앱\bizform-guide`
4. "Publish repository" 클릭

## 방법 3: Windows에서 Git Credential Manager 사용

```bash
# Git Credential Manager 설치 확인
git config --global credential.helper

# 푸시 시도 (브라우저에서 GitHub 로그인 창이 열립니다)
cd "/mnt/c/Users/LG/Desktop/법인관련 웹앱/bizform-guide"
git push -u origin main
```

## 현재 상태 확인

```bash
# 현재 브랜치 확인
git branch

# 커밋 히스토리 확인
git log --oneline

# Remote 확인
git remote -v
```

## 문제 해결

만약 "repository not found" 에러가 발생하면:
1. GitHub에서 `beob-in` 저장소가 생성되어 있는지 확인
2. 저장소가 없다면 GitHub에서 새 저장소 생성 (README 없이)

저장소 URL 변경이 필요한 경우:
```bash
git remote set-url origin https://github.com/sang-su0916/beob-in.git
```