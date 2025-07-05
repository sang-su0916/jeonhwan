#!/bin/bash
echo "GitHub Personal Access Token을 입력하세요:"
read -s TOKEN

git remote set-url origin https://sang-su0916:${TOKEN}@github.com/sang-su0916/jeonhwan.git
git push origin main

# 보안을 위해 토큰 제거
git remote set-url origin https://github.com/sang-su0916/jeonhwan.git

echo "푸시 완료!"