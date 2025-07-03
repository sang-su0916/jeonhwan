import React, { useState } from 'react';
import { DocumentTemplate, DocumentField } from '../../data/documentTemplates';
import { Card, Button, Input } from '../Common';

interface DocumentFormProps {
  template: DocumentTemplate;
  onGenerate: (data: Record<string, string>) => void;
  onCancel: () => void;
}

export const DocumentForm: React.FC<DocumentFormProps> = ({
  template,
  onGenerate,
  onCancel
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
    
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => ({
        ...prev,
        [fieldId]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    template.fields.forEach(field => {
      if (field.required && !formData[field.id]?.trim()) {
        newErrors[field.id] = `${field.label}는 필수 입력 항목입니다.`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onGenerate(formData);
    }
  };

  const renderField = (field: DocumentField) => {
    const value = formData[field.id] || '';
    const error = errors[field.id];

    switch (field.type) {
      case 'select':
        return (
          <div key={field.id} className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className={`
                block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
                focus:outline-none focus:ring-blue-500 focus:border-blue-500
                ${error ? 'border-red-500' : ''}
              `}
            >
              <option value="">선택해주세요</option>
              {field.options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        );

      case 'date':
        return (
          <Input
            key={field.id}
            type="date"
            label={field.label + (field.required ? ' *' : '')}
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            error={error}
            placeholder={field.placeholder}
          />
        );

      case 'number':
        return (
          <Input
            key={field.id}
            type="number"
            label={field.label + (field.required ? ' *' : '')}
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            error={error}
            placeholder={field.placeholder}
          />
        );

      default:
        return (
          <Input
            key={field.id}
            type="text"
            label={field.label + (field.required ? ' *' : '')}
            value={value}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
            error={error}
            placeholder={field.placeholder}
          />
        );
    }
  };

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h2>
        <p className="text-gray-600">{template.description}</p>
      </div>

      <div className="space-y-6">
        <div className="grid gap-6">
          {template.fields.map(renderField)}
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={onCancel}
          >
            취소
          </Button>
          <Button onClick={handleSubmit}>
            문서 생성
          </Button>
        </div>
      </div>
    </Card>
  );
};