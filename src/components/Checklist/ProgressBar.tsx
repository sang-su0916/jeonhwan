import React from 'react';
import { ChecklistItem } from '../../types';

interface ProgressBarProps {
  items: ChecklistItem[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ items }) => {
  const totalItems = items.length;
  const completedItems = items.filter(item => item.status === 'completed').length;
  const inProgressItems = items.filter(item => item.status === 'in-progress').length;
  
  const completedPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  const inProgressPercentage = totalItems > 0 ? (inProgressItems / totalItems) * 100 : 0;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">진행 현황</h2>
        <span className="text-sm text-gray-600">
          {completedItems} / {totalItems} 완료
        </span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
        <div className="relative h-4 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-300"
            style={{ width: `${completedPercentage}%` }}
          />
          <div 
            className="absolute top-0 h-full bg-yellow-400 transition-all duration-300"
            style={{ 
              left: `${completedPercentage}%`, 
              width: `${inProgressPercentage}%` 
            }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-green-600">{completedItems}</div>
          <div className="text-xs text-gray-600">완료</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-yellow-600">{inProgressItems}</div>
          <div className="text-xs text-gray-600">진행중</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-600">
            {totalItems - completedItems - inProgressItems}
          </div>
          <div className="text-xs text-gray-600">대기</div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <div className="text-lg font-semibold text-gray-900">
          {completedPercentage.toFixed(1)}% 완료
        </div>
        <div className="text-sm text-gray-600">
          {completedItems === totalItems 
            ? '🎉 모든 단계를 완료했습니다!' 
            : `${totalItems - completedItems}개 항목이 남았습니다.`
          }
        </div>
      </div>
    </div>
  );
};