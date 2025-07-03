# BizForm Guide

법인 설립 시점을 고민하는 스타트업·소상공인을 위한 맞춤형 의사결정 지원 서비스

## 🎯 주요 기능

- **맞춤형 추천**: 간단한 질문으로 최적의 사업 형태 추천
- **형태 비교**: 개인사업자, 주식회사, 유한책임회사 상세 비교
- **인터랙티브 체크리스트**: 단계별 설립 절차 관리
- **문서 자동 생성**: 필수 서류 템플릿 제공 및 자동 생성

## 🛠 기술 스택

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Authentication**: Firebase Auth (Google OAuth)
- **Database**: Firebase Firestore
- **Hosting**: Firebase Hosting
- **Routing**: React Router v6

## 📦 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 Firebase 설정을 입력하세요:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 빌드
```bash
npm run build
```

### 5. 배포 (Firebase Hosting)
```bash
# Firebase CLI 로그인
npx firebase login

# 배포
npx firebase deploy
```

## 📁 프로젝트 구조

```
src/
├── components/           # 재사용 가능한 컴포넌트
│   ├── Common/          # 공통 컴포넌트 (Button, Input, Card 등)
│   ├── Auth/            # 인증 관련 컴포넌트
│   ├── Onboarding/      # 온보딩 및 질문 컴포넌트
│   ├── Dashboard/       # 대시보드 컴포넌트
│   ├── Checklist/       # 체크리스트 컴포넌트
│   └── Forms/           # 문서 생성 폼 컴포넌트
├── pages/               # 페이지 컴포넌트
├── contexts/            # React Context (인증 등)
├── hooks/               # 커스텀 훅
├── services/            # Firebase 설정 및 API 서비스
├── utils/               # 유틸리티 함수
├── data/                # 정적 데이터 (질문, 템플릿 등)
└── types/               # TypeScript 타입 정의
```

## 🔥 Firebase 설정

1. [Firebase Console](https://console.firebase.google.com/)에서 새 프로젝트 생성
2. Authentication > Sign-in method에서 Google 로그인 활성화
3. Firestore Database 생성
4. Hosting 설정
5. 웹 앱 등록 후 설정 정보를 `.env`에 추가

## 📋 사용법

### 1. 온보딩
- Google 계정으로 로그인
- 5가지 질문에 답변
- 맞춤형 사업 형태 추천 받기

### 2. 대시보드
- 사업 형태별 상세 비교
- 설립 비용, 세율, 장단점 확인

### 3. 체크리스트
- 선택한 사업 형태의 설립 절차
- 단계별 진행 상황 관리
- 팁과 관련 링크 제공

### 4. 문서 생성
- 필요한 서류 템플릿 선택
- 정보 입력 후 자동 생성
- 텍스트 파일로 다운로드

## 🤝 기여하기

1. 이 저장소를 포크하세요
2. 기능 브랜치를 생성하세요 (`git checkout -b feature/amazing-feature`)
3. 변경 사항을 커밋하세요 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 열어주세요

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 지원

문제가 발생하거나 제안사항이 있으시면 [이슈](../../issues)를 생성해주세요.