import React from 'react';
import { DocumentTemplate } from '../../data/documentTemplates';
import { Card, Button } from '../Common';

interface TemplateSelectorProps {
  templates: DocumentTemplate[];
  selectedEntityType?: string;
  onSelect: (template: DocumentTemplate) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selectedEntityType,
  onSelect
}) => {
  const filteredTemplates = selectedEntityType 
    ? templates.filter(template => template.entityTypes.includes(selectedEntityType))
    : templates;

  const getEntityTypeDisplay = (entityTypes: string[]) => {
    const typeMap: Record<string, string> = {
      'individual': '개인사업자',
      'corporation': '주식회사',
      'llc': '유한책임회사'
    };
    
    return entityTypes.map(type => typeMap[type] || type).join(', ');
  };

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">문서 템플릿 선택</h2>
        <p className="text-gray-600">
          생성하고 싶은 문서를 선택해주세요.
          {selectedEntityType && ` (${getEntityTypeDisplay([selectedEntityType])} 전용)`}
        </p>
      </div>

      {filteredTemplates.length === 0 ? (
        <Card className="text-center py-8">
          <p className="text-gray-500">
            {selectedEntityType 
              ? '선택한 사업 형태에 맞는 템플릿이 없습니다.'
              : '사용 가능한 템플릿이 없습니다.'
            }
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {template.name}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.entityTypes.map((type) => (
                      <span
                        key={type}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                      >
                        {getEntityTypeDisplay([type])}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">
                    필요한 정보: {template.fields.filter(f => f.required).length}개 필드
                  </div>
                </div>
                <div className="ml-4">
                  <Button onClick={() => onSelect(template)}>
                    선택
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};