import React from 'react';
import { Recommendation } from '../../types';
import { Card, Button } from '../Common';

interface RecommendationResultProps {
  recommendation: Recommendation;
  onRestart: () => void;
  onContinue: () => void;
}

export const RecommendationResult: React.FC<RecommendationResultProps> = ({
  recommendation,
  onRestart,
  onContinue
}) => {
  const getEntityTypeKorean = (type: string) => {
    switch (type) {
      case 'individual':
        return '개인사업자';
      case 'corporation':
        return '주식회사';
      case 'llc':
        return '유한책임회사';
      default:
        return '알 수 없음';
    }
  };

  const getEntityColor = (type: string) => {
    switch (type) {
      case 'individual':
        return 'bg-green-100 text-green-800';
      case 'corporation':
        return 'bg-blue-100 text-blue-800';
      case 'llc':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="text-center">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            추천 결과
          </h2>
          <p className="text-gray-600">
            입력하신 정보를 바탕으로 최적의 사업 형태를 추천해드립니다.
          </p>
        </div>

        <div className="mb-8">
          <div className={`inline-block px-6 py-3 rounded-full text-lg font-semibold ${getEntityColor(recommendation.entityType)}`}>
            {getEntityTypeKorean(recommendation.entityType)}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            추천 점수: {recommendation.score}점
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              📝 추천 근거
            </h3>
            <ul className="space-y-2">
              {recommendation.reasoning.map((reason, index) => (
                <li key={index} className="text-gray-700 flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              💰 예상 설립 비용
            </h3>
            <p className="text-2xl font-bold text-blue-600 mb-2">
              {recommendation.details.setupCost.toLocaleString()}원
            </p>
            <p className="text-sm text-gray-600">
              {recommendation.details.setupCost === 0 ? '별도 설립 비용 없음' : '기본 설립 비용 기준'}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="text-left">
            <h3 className="text-lg font-semibold text-green-700 mb-3">
              ✅ 장점
            </h3>
            <ul className="space-y-2">
              {recommendation.details.pros.map((pro, index) => (
                <li key={index} className="text-gray-700 flex items-start">
                  <span className="text-green-500 mr-2">+</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-left">
            <h3 className="text-lg font-semibold text-red-700 mb-3">
              ⚠️ 단점
            </h3>
            <ul className="space-y-2">
              {recommendation.details.cons.map((con, index) => (
                <li key={index} className="text-gray-700 flex items-start">
                  <span className="text-red-500 mr-2">-</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-x-4">
          <Button variant="outline" onClick={onRestart}>
            다시 진단하기
          </Button>
          <Button onClick={onContinue}>
            체크리스트 보기
          </Button>
        </div>
      </Card>
    </div>
  );
};