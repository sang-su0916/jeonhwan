import React from 'react';
import { EntityComparison } from '../../types';
import { Card } from '../Common';

interface EntityCardProps {
  entity: EntityComparison;
  isRecommended?: boolean;
}

export const EntityCard: React.FC<EntityCardProps> = ({ entity, isRecommended = false }) => {
  const getEntityColor = (type: string) => {
    switch (type) {
      case 'individual':
        return 'border-green-500 bg-green-50';
      case 'corporation':
        return 'border-blue-500 bg-blue-50';
      case 'llc':
        return 'border-purple-500 bg-purple-50';
      default:
        return 'border-gray-300 bg-white';
    }
  };

  return (
    <Card className={`${getEntityColor(entity.type)} ${isRecommended ? 'ring-2 ring-yellow-400' : ''} relative`}>
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
            추천
          </span>
        </div>
      )}
      
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-900">{entity.name}</h3>
        <div className="mt-2">
          <span className="text-2xl font-bold text-blue-600">
            {entity.setupCost === 0 ? '무료' : `${(entity.setupCost / 10000).toFixed(0)}만원`}
          </span>
          <p className="text-sm text-gray-600">설립 비용</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">세율</span>
          <span className="text-sm font-medium">{entity.taxRate}%~</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">투자 유치</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${
                  i < entity.investmentEase ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">책임</span>
          <span className={`text-xs px-2 py-1 rounded-full ${
            entity.liability === '무한책임' 
              ? 'bg-red-100 text-red-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            {entity.liability}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-green-700">장점</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          {entity.pros.slice(0, 2).map((pro, index) => (
            <li key={index} className="flex items-start">
              <span className="text-green-500 mr-1">•</span>
              {pro}
            </li>
          ))}
        </ul>
        
        <h4 className="text-sm font-medium text-red-700 mt-3">단점</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          {entity.cons.slice(0, 2).map((con, index) => (
            <li key={index} className="flex items-start">
              <span className="text-red-500 mr-1">•</span>
              {con}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};