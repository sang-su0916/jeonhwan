import { EntityComparison } from '../types';

export const entityComparisonData: EntityComparison[] = [
  {
    type: 'individual',
    name: '개인사업자',
    setupCost: 0,
    taxRate: 6.6, // 종합소득세 최저세율
    investmentEase: 1,
    liability: '무한책임',
    management: '간단',
    pros: [
      '설립 비용 없음',
      '간단한 세무 처리',
      '빠른 사업 시작',
      '자유로운 운영'
    ],
    cons: [
      '무한 책임',
      '투자 유치 어려움',
      '사업 확장 제약',
      '높은 세율 (고소득시)'
    ]
  },
  {
    type: 'corporation',
    name: '주식회사',
    setupCost: 500000,
    taxRate: 10, // 법인세 최저세율
    investmentEase: 5,
    liability: '유한책임',
    management: '복잡',
    pros: [
      '유한 책임',
      '투자 유치 용이',
      '사업 확장 유리',
      '신용도 높음'
    ],
    cons: [
      '설립 비용 발생',
      '복잡한 세무 처리',
      '높은 유지 비용',
      '엄격한 규제'
    ]
  },
  {
    type: 'llc',
    name: '유한책임회사',
    setupCost: 100000,
    taxRate: 8, // 중간 세율
    investmentEase: 3,
    liability: '유한책임',
    management: '보통',
    pros: [
      '유한 책임',
      '상대적 간단함',
      '세무 선택권',
      '적은 설립 비용'
    ],
    cons: [
      '인지도 낮음',
      '투자 유치 제약',
      '운영 제약',
      '제한적 활용'
    ]
  }
];