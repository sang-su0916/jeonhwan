import { Question } from '../types';

export const onboardingQuestions: Question[] = [
  {
    id: 'q1',
    text: '예상 연 매출액은 얼마인가요?',
    type: 'single',
    options: [
      '3,000만원 미만',
      '3,000만원 ~ 1억원',
      '1억원 ~ 5억원',
      '5억원 이상'
    ],
    weight: 3,
    category: 'financial'
  },
  {
    id: 'q2', 
    text: '투자 유치 계획이 있나요?',
    type: 'single',
    options: [
      '없음',
      '1년 이내 계획',
      '2-3년 이내 계획',
      '이미 진행 중'
    ],
    weight: 4,
    category: 'financial'
  },
  {
    id: 'q3',
    text: '현재 또는 예상 직원 수는?',
    type: 'single',
    options: [
      '혼자 (1명)',
      '2-4명',
      '5-9명',
      '10명 이상'
    ],
    weight: 2,
    category: 'operational'
  },
  {
    id: 'q4',
    text: '사업의 주요 성격은?',
    type: 'single',
    options: [
      '개인 서비스 (프리랜싱, 컨설팅)',
      '제품 판매',
      '온라인 서비스/앱',
      '제조업'
    ],
    weight: 2,
    category: 'business'
  },
  {
    id: 'q5',
    text: '세무/회계 복잡성에 대한 부담은?',
    type: 'scale',
    options: ['매우 부담', '부담', '보통', '괜찮음', '전혀 부담 없음'],
    weight: 1,
    category: 'operational'
  }
];