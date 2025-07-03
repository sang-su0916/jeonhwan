import React, { useState } from 'react';
import { ChecklistItem } from '../../types';
import { Card, Button } from '../Common';

interface ChecklistItemCardProps {
  item: ChecklistItem;
  onStatusChange: (id: string, status: ChecklistItem['status']) => void;
  isBlocked?: boolean;
}

export const ChecklistItemCard: React.FC<ChecklistItemCardProps> = ({
  item,
  onStatusChange,
  isBlocked = false
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'in-progress':
        return (
          <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getCategoryBadge = (category: ChecklistItem['category']) => {
    const colors = {
      setup: 'bg-blue-100 text-blue-800',
      legal: 'bg-purple-100 text-purple-800',
      financial: 'bg-green-100 text-green-800',
      operational: 'bg-orange-100 text-orange-800'
    };
    
    const names = {
      setup: '설정',
      legal: '법적',
      financial: '재정',
      operational: '운영'
    };

    return (
      <span className={`px-2 py-1 text-xs rounded-full ${colors[category]}`}>
        {names[category]}
      </span>
    );
  };

  return (
    <Card className={`${getStatusColor(item.status)} ${isBlocked ? 'opacity-50' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <div className="flex-shrink-0 mt-1">
            {getStatusIcon(item.status)}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              {getCategoryBadge(item.category)}
              {isBlocked && (
                <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                  대기중
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-gray-600 ml-2"
        >
          <svg 
            className={`w-5 h-5 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {item.tips && item.tips.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">💡 팁</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {item.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {item.links && item.links.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">🔗 관련 링크</h4>
              <div className="space-y-1">
                {item.links.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 block"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2 mt-4">
        <Button
          variant={item.status === 'pending' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onStatusChange(item.id, 'in-progress')}
          disabled={isBlocked || item.status === 'completed'}
        >
          시작하기
        </Button>
        <Button
          variant={item.status === 'completed' ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onStatusChange(item.id, 'completed')}
          disabled={isBlocked}
        >
          완료
        </Button>
        {item.status !== 'pending' && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onStatusChange(item.id, 'pending')}
          >
            초기화
          </Button>
        )}
      </div>
    </Card>
  );
};