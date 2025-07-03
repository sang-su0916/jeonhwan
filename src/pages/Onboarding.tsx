import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { QuestionCard, RecommendationResult } from '../components/Onboarding';
import { onboardingQuestions } from '../data/questions';
import { calculateRecommendation } from '../utils/recommendation';
import { Recommendation } from '../types';

interface Answer {
  questionId: string;
  answer: string;
}

export const Onboarding: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = onboardingQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (!selectedAnswer) return;

    const newAnswers = [...answers];
    const existingIndex = newAnswers.findIndex(a => a.questionId === currentQuestion.id);
    
    if (existingIndex >= 0) {
      newAnswers[existingIndex] = { questionId: currentQuestion.id, answer: selectedAnswer };
    } else {
      newAnswers.push({ questionId: currentQuestion.id, answer: selectedAnswer });
    }
    
    setAnswers(newAnswers);

    if (currentQuestionIndex === onboardingQuestions.length - 1) {
      // 마지막 질문이면 결과 계산
      const result = calculateRecommendation(newAnswers, onboardingQuestions, user?.uid || '');
      setRecommendation(result);
      setIsComplete(true);
    } else {
      // 다음 질문으로
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      
      // 다음 질문의 기존 답변이 있으면 선택
      const nextQuestion = onboardingQuestions[currentQuestionIndex + 1];
      const existingAnswer = newAnswers.find(a => a.questionId === nextQuestion.id);
      setSelectedAnswer(existingAnswer?.answer || '');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      
      // 이전 질문의 답변 복원
      const prevQuestion = onboardingQuestions[currentQuestionIndex - 1];
      const existingAnswer = answers.find(a => a.questionId === prevQuestion.id);
      setSelectedAnswer(existingAnswer?.answer || '');
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer('');
    setRecommendation(null);
    setIsComplete(false);
  };

  const handleContinue = () => {
    // 체크리스트 페이지로 이동
    navigate('/checklist');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            로그인이 필요합니다
          </h1>
          <p className="text-gray-600">
            온보딩을 시작하려면 먼저 로그인해주세요.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {!isComplete ? (
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={handleAnswerSelect}
              onNext={handleNext}
              onPrev={handlePrev}
              isFirst={currentQuestionIndex === 0}
              isLast={currentQuestionIndex === onboardingQuestions.length - 1}
              currentIndex={currentQuestionIndex}
              totalQuestions={onboardingQuestions.length}
            />
          ) : (
            recommendation && (
              <RecommendationResult
                recommendation={recommendation}
                onRestart={handleRestart}
                onContinue={handleContinue}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};