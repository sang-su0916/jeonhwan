import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ComparisonTable, EntityCard } from '../components/Dashboard';
import { entityComparisonData } from '../data/entityComparison';
import { Button } from '../components/Common';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            로그인이 필요합니다
          </h1>
          <p className="text-gray-600">
            대시보드를 보려면 먼저 로그인해주세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              사업 형태 비교 대시보드
            </h1>
            <p className="text-gray-600">
              다양한 사업 형태의 특징을 비교하고 최적의 선택을 하세요.
            </p>
          </div>

          {/* 카드 형태 비교 */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              한눈에 보는 사업 형태
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {entityComparisonData.map((entity) => (
                <EntityCard 
                  key={entity.type} 
                  entity={entity}
                  isRecommended={entity.type === 'individual'} // 예시: 개인사업자 추천
                />
              ))}
            </div>
          </div>

          {/* 상세 비교 테이블 */}
          <div className="mb-8">
            <ComparisonTable data={entityComparisonData} />
          </div>

          {/* 액션 버튼 */}
          <div className="text-center space-x-4">
            <Button onClick={() => window.location.href = '/onboarding'}>
              맞춤 진단 받기
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/checklist'}>
              체크리스트 보기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};