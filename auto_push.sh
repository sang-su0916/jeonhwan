#!/bin/bash

# GitHub 푸시 자동화 스크립트
# 사용법: ./auto_push.sh [your-github-token]

TOKEN=$1

if [ -z "$TOKEN" ]; then
    echo "❌ GitHub Personal Access Token이 필요합니다!"
    echo "사용법: ./auto_push.sh [your-github-token]"
    echo ""
    echo "토큰 생성 방법:"
    echo "1. https://github.com/settings/tokens 접속"
    echo "2. 'Generate new token (classic)' 클릭"
    echo "3. 'repo' 권한 체크"
    echo "4. 생성된 토큰 복사"
    exit 1
fi

echo "🚀 GitHub에 푸시를 시작합니다..."

# Remote URL을 토큰 포함 형식으로 변경
git remote set-url origin https://sang-su0916:${TOKEN}@github.com/sang-su0916/beob-in.git

# 푸시 실행
git push -u origin main

# 보안을 위해 토큰 제거
git remote set-url origin https://github.com/sang-su0916/beob-in.git

echo "✅ 푸시가 완료되었습니다!"
echo "🔗 https://github.com/sang-su0916/beob-in 에서 확인하세요."