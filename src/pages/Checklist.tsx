import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ChecklistItemCard, ProgressBar } from '../components/Checklist';
import { Button } from '../components/Common';
import { getChecklistByEntityType } from '../data/checklistData';
import { ChecklistItem } from '../types';

export const Checklist: React.FC = () => {
  const { user } = useAuth();
  const [entityType, setEntityType] = useState<string>('individual');
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');

  useEffect(() => {
    const checklistItems = getChecklistByEntityType(entityType);
    setItems(checklistItems);
  }, [entityType]);

  const handleStatusChange = (id: string, status: ChecklistItem['status']) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const isItemBlocked = (item: ChecklistItem): boolean => {
    if (!item.dependencies || item.dependencies.length === 0) {
      return false;
    }
    
    return item.dependencies.some(depId => {
      const depItem = items.find(i => i.id === depId);
      return depItem?.status !== 'completed';
    });
  };

  const filteredItems = items.filter(item => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  const getEntityTypeKorean = (type: string) => {
    switch (type) {
      case 'individual':
        return '개인사업자';
      case 'corporation':
        return '주식회사';
      case 'llc':
        return '유한책임회사';
      default:
        return '개인사업자';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            로그인이 필요합니다
          </h1>
          <p className="text-gray-600">
            체크리스트를 보려면 먼저 로그인해주세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              설립 체크리스트
            </h1>
            <p className="text-gray-600">
              선택한 사업 형태에 따른 단계별 체크리스트를 확인하고 진행하세요.
            </p>
          </div>

          {/* 사업 형태 선택 */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">사업 형태 선택</h2>
            <div className="flex gap-4">
              {['individual', 'corporation', 'llc'].map((type) => (
                <button
                  key={type}
                  onClick={() => setEntityType(type)}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    entityType === type
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {getEntityTypeKorean(type)}
                </button>
              ))}
            </div>
          </div>

          {/* 진행 현황 */}
          <div className="mb-6">
            <ProgressBar items={items} />
          </div>

          {/* 필터 */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">필터</h2>
            <div className="flex gap-2">
              {[
                { key: 'all', label: '전체' },
                { key: 'pending', label: '대기중' },
                { key: 'in-progress', label: '진행중' },
                { key: 'completed', label: '완료' }
              ].map((filterOption) => (
                <Button
                  key={filterOption.key}
                  variant={filter === filterOption.key ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(filterOption.key as any)}
                >
                  {filterOption.label}
                </Button>
              ))}
            </div>
          </div>

          {/* 체크리스트 항목들 */}
          <div className="space-y-4 mb-8">
            {filteredItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {filter === 'all' 
                    ? '체크리스트 항목이 없습니다.' 
                    : `${filter} 상태의 항목이 없습니다.`
                  }
                </p>
              </div>
            ) : (
              filteredItems.map((item) => (
                <ChecklistItemCard
                  key={item.id}
                  item={item}
                  onStatusChange={handleStatusChange}
                  isBlocked={isItemBlocked(item)}
                />
              ))
            )}
          </div>

          {/* 액션 버튼 */}
          <div className="text-center space-x-4">
            <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
              대시보드로 돌아가기
            </Button>
            <Button onClick={() => window.location.href = '/documents'}>
              문서 생성하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};