export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  entityTypes: string[];
  fields: DocumentField[];
  template: string;
}

export interface DocumentField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select';
  required: boolean;
  options?: string[];
  placeholder?: string;
}

export const documentTemplates: DocumentTemplate[] = [
  {
    id: 'articles_of_incorporation',
    name: '정관',
    description: '주식회사 설립을 위한 정관 문서',
    entityTypes: ['corporation'],
    fields: [
      {
        id: 'company_name',
        label: '회사명',
        type: 'text',
        required: true,
        placeholder: '주식회사 OO'
      },
      {
        id: 'business_purpose',
        label: '사업목적',
        type: 'text',
        required: true,
        placeholder: '소프트웨어 개발 및 판매업'
      },
      {
        id: 'head_office',
        label: '본점 소재지',
        type: 'text',
        required: true,
        placeholder: '서울특별시 강남구 테헤란로 123'
      },
      {
        id: 'capital_amount',
        label: '자본금 총액',
        type: 'number',
        required: true,
        placeholder: '10000000'
      },
      {
        id: 'shares_per_stock',
        label: '1주의 금액',
        type: 'number',
        required: true,
        placeholder: '5000'
      },
      {
        id: 'total_shares',
        label: '발행할 주식의 총수',
        type: 'number',
        required: true,
        placeholder: '2000'
      }
    ],
    template: `
정관

제1장 총칙

제1조 (상호) 이 회사는 {company_name}라 한다.

제2조 (목적) 이 회사는 다음의 사업을 목적으로 한다.
1. {business_purpose}
2. 기타 위 각호에 부대하는 일체의 사업

제3조 (본점의 소재지) 이 회사의 본점은 {head_office}에 둔다.

제4조 (공고방법) 이 회사의 공고는 회사 홈페이지(www.company.co.kr)에 게재한다.

제2장 주식

제5조 (발행할 주식의 총수) 이 회사가 발행할 주식의 총수는 {total_shares}주로 한다.

제6조 (1주의 금액) 이 회사가 발행하는 주식 1주의 금액은 금 {shares_per_stock}원으로 한다.

제7조 (설립시에 발행하는 주식의 수) 이 회사가 설립시에 발행하는 주식의 수는 {total_shares}주로 한다.

제8조 (주권의 종류) 이 회사의 주권은 기명식으로 한다.

제3장 자본금

제9조 (자본금의 총액) 이 회사의 자본금 총액은 금 {capital_amount}원으로 한다.

제4장 기관

제10조 (이사의 수) 이 회사의 이사는 1인 이상 3인 이하로 한다.

제11조 (대표이사) 이사가 2인 이상인 경우에는 이사회에서 대표이사 1인을 선임한다.

제12조 (이사의 임기) 이사의 임기는 3년으로 한다. 단, 연임할 수 있다.

제5장 부칙

제13조 (최초의 이사) 이 회사의 최초의 이사는 다음과 같다.
이사 : [대표이사 성명]

제14조 (정관에 정하지 아니한 사항) 이 정관에 정하지 아니한 사항은 상법의 규정에 따른다.

부칙
이 정관은 회사성립과 동시에 효력을 발생한다.
    `
  },
  {
    id: 'business_registration_application',
    name: '사업자등록신고서',
    description: '개인사업자 등록을 위한 신고서',
    entityTypes: ['individual'],
    fields: [
      {
        id: 'business_owner_name',
        label: '사업자 성명',
        type: 'text',
        required: true,
        placeholder: '홍길동'
      },
      {
        id: 'business_name',
        label: '상호',
        type: 'text',
        required: true,
        placeholder: 'OO컴퍼니'
      },
      {
        id: 'business_address',
        label: '사업장 주소',
        type: 'text',
        required: true,
        placeholder: '서울특별시 강남구 테헤란로 123'
      },
      {
        id: 'business_type',
        label: '업태',
        type: 'text',
        required: true,
        placeholder: '소프트웨어개발업'
      },
      {
        id: 'business_item',
        label: '종목',
        type: 'text',
        required: true,
        placeholder: '응용소프트웨어개발'
      },
      {
        id: 'start_date',
        label: '사업개시일',
        type: 'date',
        required: true
      }
    ],
    template: `
사업자등록신고서

1. 사업자 정보
   - 성명: {business_owner_name}
   - 상호: {business_name}
   - 사업장 주소: {business_address}

2. 사업 내용
   - 업태: {business_type}
   - 종목: {business_item}
   - 사업개시일: {start_date}

3. 신고 사항
   - 과세유형: 일반과세자
   - 업종코드: [해당 업종에 맞는 코드]

위와 같이 사업자등록을 신고합니다.

신고일: {current_date}
신고인: {business_owner_name} (인)
    `
  }
];