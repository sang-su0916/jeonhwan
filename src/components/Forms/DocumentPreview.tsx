import React from 'react';
import { Card, Button } from '../Common';

interface DocumentPreviewProps {
  content: string;
  title: string;
  onDownload: () => void;
  onEdit: () => void;
  onNew: () => void;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
  content,
  title,
  onDownload,
  onEdit,
  onNew
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">문서 미리보기</h2>
        <div className="space-x-2">
          <Button variant="outline" onClick={onEdit}>
            수정
          </Button>
          <Button onClick={onDownload}>
            다운로드
          </Button>
          <Button variant="outline" onClick={onNew}>
            새 문서
          </Button>
        </div>
      </div>

      <Card>
        <div className="mb-4 pb-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">
            생성일: {new Date().toLocaleDateString('ko-KR')}
          </p>
        </div>

        <div className="prose max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-800 bg-gray-50 p-6 rounded-lg border">
            {content}
          </pre>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500 mb-4">
            ※ 이 문서는 참고용이며, 실제 사용 전 전문가 검토를 권장합니다.
          </p>
          <div className="space-x-4">
            <Button onClick={onDownload}>
              📄 텍스트 다운로드
            </Button>
            <Button variant="outline">
              📊 PDF로 변환
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};