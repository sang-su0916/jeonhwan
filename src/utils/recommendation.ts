import { Question, Recommendation } from '../types';

interface Answer {
  questionId: string;
  answer: string;
}

export const calculateRecommendation = (
  answers: Answer[],
  questions: Question[],
  userId: string
): Recommendation => {
  let individualScore = 0;
  let corporationScore = 0;
  let llcScore = 0;
  
  const reasoning: string[] = [];
  
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (!question) return;
    
    const answerIndex = question.options?.indexOf(answer.answer) ?? 0;
    const weight = question.weight;
    
    switch (question.id) {
      case 'q1': // 예상 연 매출액
        if (answerIndex === 0) { // 3,000만원 미만
          individualScore += weight * 3;
          reasoning.push('낮은 매출 규모로 개인사업자가 세무상 유리합니다.');
        } else if (answerIndex === 1) { // 3,000만원 ~ 1억원
          individualScore += weight * 2;
          corporationScore += weight * 1;
        } else if (answerIndex === 2) { // 1억원 ~ 5억원
          corporationScore += weight * 2;
          llcScore += weight * 1;
          reasoning.push('중간 규모 매출로 법인 전환을 고려할 시점입니다.');
        } else { // 5억원 이상
          corporationScore += weight * 3;
          reasoning.push('높은 매출 규모로 법인 설립이 세무상 유리합니다.');
        }
        break;
        
      case 'q2': // 투자 유치 계획
        if (answerIndex === 0) { // 없음
          individualScore += weight * 2;
        } else if (answerIndex === 1) { // 1년 이내
          corporationScore += weight * 3;
          reasoning.push('투자 유치 계획으로 주식회사 설립을 권장합니다.');
        } else if (answerIndex === 2) { // 2-3년 이내
          corporationScore += weight * 2;
          llcScore += weight * 1;
        } else { // 이미 진행 중
          corporationScore += weight * 4;
          reasoning.push('투자 유치 진행 중이므로 주식회사가 필수입니다.');
        }
        break;
        
      case 'q3': // 직원 수
        if (answerIndex === 0) { // 혼자
          individualScore += weight * 2;
        } else if (answerIndex === 1) { // 2-4명
          individualScore += weight * 1;
          llcScore += weight * 1;
        } else if (answerIndex === 2) { // 5-9명
          corporationScore += weight * 2;
          reasoning.push('직원 규모가 커지면 법인이 고용 관리에 유리합니다.');
        } else { // 10명 이상
          corporationScore += weight * 3;
          reasoning.push('많은 직원으로 법인 설립이 필요합니다.');
        }
        break;
        
      case 'q4': // 사업 성격
        if (answerIndex === 0) { // 개인 서비스
          individualScore += weight * 3;
        } else if (answerIndex === 1) { // 제품 판매
          corporationScore += weight * 2;
          llcScore += weight * 1;
        } else if (answerIndex === 2) { // 온라인 서비스
          corporationScore += weight * 2;
          reasoning.push('온라인 서비스는 성장 가능성이 높아 법인이 유리합니다.');
        } else { // 제조업
          corporationScore += weight * 3;
          reasoning.push('제조업은 높은 책임과 투자가 필요해 법인이 적합합니다.');
        }
        break;
        
      case 'q5': // 세무/회계 복잡성 부담
        if (answerIndex <= 1) { // 매우 부담, 부담
          individualScore += weight * 2;
        } else if (answerIndex === 2) { // 보통
          individualScore += weight * 1;
          llcScore += weight * 1;
        } else { // 괜찮음, 전혀 부담 없음
          corporationScore += weight * 2;
        }
        break;
    }
  });
  
  // 최고 점수를 받은 형태 결정
  let recommendedType: 'individual' | 'corporation' | 'llc';
  let maxScore = Math.max(individualScore, corporationScore, llcScore);
  
  if (maxScore === individualScore) {
    recommendedType = 'individual';
  } else if (maxScore === corporationScore) {
    recommendedType = 'corporation';
  } else {
    recommendedType = 'llc';
  }
  
  // 추천 근거가 없으면 기본 근거 추가
  if (reasoning.length === 0) {
    reasoning.push('입력하신 정보를 종합적으로 분석한 결과입니다.');
  }
  
  return {
    userId,
    entityType: recommendedType,
    reasoning,
    score: maxScore,
    details: getEntityDetails(recommendedType),
    createdAt: new Date()
  };
};

const getEntityDetails = (type: 'individual' | 'corporation' | 'llc') => {
  switch (type) {
    case 'individual':
      return {
        setupCost: 0,
        taxImplications: ['소득세 적용', '간편한 세무 신고'],
        pros: ['설립 비용 없음', '간단한 세무 처리', '빠른 사업 시작'],
        cons: ['무한 책임', '투자 유치 어려움', '사업 확장 제약']
      };
    case 'corporation':
      return {
        setupCost: 500000,
        taxImplications: ['법인세 적용', '복잡한 세무 신고'],
        pros: ['유한 책임', '투자 유치 용이', '사업 확장 유리'],
        cons: ['설립 비용 발생', '복잡한 세무 처리', '높은 유지 비용']
      };
    case 'llc':
      return {
        setupCost: 100000,
        taxImplications: ['소득세 또는 법인세 선택', '중간 수준 세무'],
        pros: ['유한 책임', '상대적 간단함', '세무 선택권'],
        cons: ['인지도 낮음', '투자 유치 제약', '운영 제약']
      };
    default:
      return {
        setupCost: 0,
        taxImplications: [],
        pros: [],
        cons: []
      };
  }
};