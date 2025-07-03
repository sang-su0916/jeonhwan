import React from 'react';
import { EntityComparison } from '../../types';
import { Card } from '../Common';

interface ComparisonTableProps {
  data: EntityComparison[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ data }) => {
  return (
    <Card>
      <h2 className="text-xl font-bold text-gray-900 mb-6">사업 형태별 비교</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                구분
              </th>
              {data.map((entity) => (
                <th key={entity.type} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {entity.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                설립 비용
              </td>
              {data.map((entity) => (
                <td key={entity.type} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entity.setupCost === 0 ? '무료' : `${entity.setupCost.toLocaleString()}원`}
                </td>
              ))}
            </tr>
            
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                세율
              </td>
              {data.map((entity) => (
                <td key={entity.type} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {entity.taxRate}%~
                </td>
              ))}
            </tr>
            
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                투자 유치
              </td>
              {data.map((entity) => (
                <td key={entity.type} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
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
                </td>
              ))}
            </tr>
            
            <tr className="bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                책임 범위
              </td>
              {data.map((entity) => (
                <td key={entity.type} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    entity.liability === '무한책임' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {entity.liability}
                  </span>
                </td>
              ))}
            </tr>
            
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                관리 복잡도
              </td>
              {data.map((entity) => (
                <td key={entity.type} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    entity.management === '간단' 
                      ? 'bg-green-100 text-green-800' 
                      : entity.management === '보통'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {entity.management}
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
};