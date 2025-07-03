import React from 'react';
import { Question } from '../../types';
import { Card, Button } from '../Common';

interface QuestionCardProps {
  question: Question;
  selectedAnswer?: string;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
  currentIndex: number;
  totalQuestions: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrev,
  isFirst,
  isLast,
  currentIndex,
  totalQuestions
}) => {
  return (
    <Card className="max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            질문 {currentIndex + 1} / {totalQuestions}
          </span>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {question.text}
        </h2>
      </div>

      <div className="space-y-3 mb-8">
        {question.options?.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(option)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
              selectedAnswer === option
                ? 'border-blue-500 bg-blue-50 text-blue-900'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={isFirst}
        >
          이전
        </Button>
        
        <Button
          onClick={onNext}
          disabled={!selectedAnswer}
        >
          {isLast ? '결과 보기' : '다음'}
        </Button>
      </div>
    </Card>
  );
};