import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { TemplateSelector, DocumentForm, DocumentPreview } from '../components/Forms';
import { Button } from '../components/Common';
import { documentTemplates, DocumentTemplate } from '../data/documentTemplates';
import { generateDocument, downloadTextFile } from '../utils/documentGenerator';

type ViewState = 'select' | 'form' | 'preview';

export const Documents: React.FC = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<ViewState>('select');
  const [selectedTemplate, setSelectedTemplate] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [selectedEntityType, setSelectedEntityType] = useState<string>('');

  const handleTemplateSelect = (template: DocumentTemplate) => {
    setSelectedTemplate(template);
    setCurrentView('form');
  };

  const handleDocumentGenerate = (data: Record<string, string>) => {
    if (!selectedTemplate) return;
    
    setFormData(data);
    const content = generateDocument(selectedTemplate, data);
    setGeneratedContent(content);
    setCurrentView('preview');
  };

  const handleDownload = () => {
    if (!selectedTemplate || !generatedContent) return;
    
    const filename = `${selectedTemplate.name}_${new Date().toISOString().split('T')[0]}`;
    downloadTextFile(generatedContent, filename);
  };

  const handleEdit = () => {
    setCurrentView('form');
  };

  const handleNewDocument = () => {
    setSelectedTemplate(null);
    setFormData({});
    setGeneratedContent('');
    setCurrentView('select');
  };

  const handleCancel = () => {
    setCurrentView('select');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            로그인이 필요합니다
          </h1>
          <p className="text-gray-600">
            문서 생성 기능을 이용하려면 먼저 로그인해주세요.
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
              문서 자동 생성
            </h1>
            <p className="text-gray-600">
              필요한 법인 설립 문서를 자동으로 생성하고 다운로드하세요.
            </p>
          </div>

          {/* 사업 형태 선택 */}
          {currentView === 'select' && (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">사업 형태 선택 (선택사항)</h2>
              <p className="text-sm text-gray-600 mb-4">
                사업 형태를 선택하면 해당하는 문서만 표시됩니다.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedEntityType('')}
                  className={`px-4 py-2 rounded-lg border-2 transition-all ${
                    selectedEntityType === ''
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  전체
                </button>
                {[
                  { key: 'individual', label: '개인사업자' },
                  { key: 'corporation', label: '주식회사' },
                  { key: 'llc', label: '유한책임회사' }
                ].map((entityType) => (
                  <button
                    key={entityType.key}
                    onClick={() => setSelectedEntityType(entityType.key)}
                    className={`px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedEntityType === entityType.key
                        ? 'border-blue-500 bg-blue-50 text-blue-900'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {entityType.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 뒤로 가기 버튼 */}
          {currentView !== 'select' && (
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => setCurrentView(currentView === 'preview' ? 'form' : 'select')}
              >
                ← 뒤로 가기
              </Button>
            </div>
          )}

          {/* 메인 컨텐츠 */}
          {currentView === 'select' && (
            <TemplateSelector
              templates={documentTemplates}
              selectedEntityType={selectedEntityType || undefined}
              onSelect={handleTemplateSelect}
            />
          )}

          {currentView === 'form' && selectedTemplate && (
            <DocumentForm
              template={selectedTemplate}
              onGenerate={handleDocumentGenerate}
              onCancel={handleCancel}
            />
          )}

          {currentView === 'preview' && selectedTemplate && generatedContent && (
            <DocumentPreview
              content={generatedContent}
              title={selectedTemplate.name}
              onDownload={handleDownload}
              onEdit={handleEdit}
              onNew={handleNewDocument}
            />
          )}

          {/* 추가 액션 */}
          {currentView === 'select' && (
            <div className="mt-8 text-center space-x-4">
              <Button variant="outline" onClick={() => window.location.href = '/checklist'}>
                체크리스트로 돌아가기
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>
                대시보드 보기
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};