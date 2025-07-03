import { ChecklistItem } from '../types';

export const getChecklistByEntityType = (entityType: string): ChecklistItem[] => {
  const commonItems: ChecklistItem[] = [
    {
      id: 'business_name',
      title: '상호(사업자명) 결정',
      description: '사업에 사용할 이름을 정하고 중복 여부를 확인합니다.',
      status: 'pending',
      category: 'setup',
      tips: [
        '상호는 다른 사업자와 중복될 수 없습니다',
        '온라인 사업자등록증 발급 시스템에서 중복 확인 가능',
        '간단하고 기억하기 쉬운 이름을 선택하세요'
      ],
      links: [
        'https://www.ftc.go.kr/solution/openData.do?menuNo=7830100'
      ]
    },
    {
      id: 'business_location',
      title: '사업장 소재지 확정',
      description: '사업을 수행할 주소를 정합니다.',
      status: 'pending',
      category: 'setup',
      tips: [
        '주거용 건물도 사업장으로 등록 가능',
        '임대차 계약서가 필요합니다',
        '사업 성격에 맞는 용도지역인지 확인하세요'
      ]
    }
  ];

  if (entityType === 'individual') {
    return [
      ...commonItems,
      {
        id: 'business_registration',
        title: '사업자등록신고',
        description: '세무서에 사업자등록신고서를 제출합니다.',
        status: 'pending',
        category: 'legal',
        dependencies: ['business_name', 'business_location'],
        tips: [
          '사업 시작일로부터 20일 이내 신고',
          '온라인(홈택스) 또는 세무서 방문 신고 가능',
          '수수료는 무료입니다'
        ],
        links: [
          'https://www.hometax.go.kr'
        ]
      },
      {
        id: 'bank_account',
        title: '사업용 통장 개설',
        description: '사업 수입과 지출을 관리할 통장을 개설합니다.',
        status: 'pending',
        category: 'financial',
        dependencies: ['business_registration'],
        tips: [
          '사업자등록증 사본 필요',
          '개인통장과 분리하여 관리 권장',
          '인터넷뱅킹 서비스 신청 고려'
        ]
      }
    ];
  }

  if (entityType === 'corporation') {
    return [
      ...commonItems,
      {
        id: 'articles_of_incorporation',
        title: '정관 작성',
        description: '회사의 기본 규칙을 정한 정관을 작성합니다.',
        status: 'pending',
        category: 'legal',
        dependencies: ['business_name'],
        tips: [
          '공증이 필요합니다',
          '사업 목적을 구체적으로 기재',
          '주식 관련 사항 명확히 규정'
        ]
      },
      {
        id: 'capital_deposit',
        title: '자본금 납입',
        description: '발기인 명의로 자본금을 납입합니다.',
        status: 'pending',
        category: 'financial',
        tips: [
          '최소 자본금 제한 없음',
          '발기인 개인 통장에 납입',
          '납입증명서 발급 받기'
        ]
      },
      {
        id: 'incorporation_registration',
        title: '법인 설립등기',
        description: '법원에 법인 설립등기를 신청합니다.',
        status: 'pending',
        category: 'legal',
        dependencies: ['articles_of_incorporation', 'capital_deposit'],
        tips: [
          '등기비용 약 40-50만원',
          '법무사 대행 서비스 이용 가능',
          '등기 완료까지 약 1-2주 소요'
        ]
      },
      {
        id: 'business_registration_corp',
        title: '사업자등록신고 (법인)',
        description: '세무서에 법인 사업자등록신고를 합니다.',
        status: 'pending',
        category: 'legal',
        dependencies: ['incorporation_registration'],
        tips: [
          '법인등기부등본 필요',
          '설립일로부터 20일 이내 신고',
          '법인세 신고 의무 발생'
        ]
      },
      {
        id: 'insurance_registration',
        title: '4대 보험 가입',
        description: '국민연금, 건강보험, 고용보험, 산재보험에 가입합니다.',
        status: 'pending',
        category: 'operational',
        dependencies: ['business_registration_corp'],
        tips: [
          '직원이 있는 경우 필수 가입',
          '대표이사도 가입 가능',
          '각 기관별 신고 필요'
        ]
      }
    ];
  }

  if (entityType === 'llc') {
    return [
      ...commonItems,
      {
        id: 'articles_of_incorporation_llc',
        title: '정관 작성 (유한책임회사)',
        description: '유한책임회사의 정관을 작성합니다.',
        status: 'pending',
        category: 'legal',
        dependencies: ['business_name'],
        tips: [
          '공증이 필요합니다',
          '사원의 권리와 의무 명시',
          '이익 배분 방법 규정'
        ]
      },
      {
        id: 'capital_contribution',
        title: '출자금 납입',
        description: '사원들의 출자금을 납입합니다.',
        status: 'pending',
        category: 'financial',
        tips: [
          '금전 출자가 원칙',
          '현물 출자도 가능',
          '출자증명서 발급'
        ]
      },
      {
        id: 'llc_registration',
        title: '유한책임회사 설립등기',
        description: '법원에 설립등기를 신청합니다.',
        status: 'pending',
        category: 'legal',
        dependencies: ['articles_of_incorporation_llc', 'capital_contribution'],
        tips: [
          '등기비용 약 15-20만원',
          '주식회사보다 저렴',
          '설립 절차 상대적 간단'
        ]
      }
    ];
  }

  return commonItems;
};