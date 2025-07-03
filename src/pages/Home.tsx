import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button, Card } from '../components/Common';

export const Home: React.FC = () => {
  const { user, signInWithGoogle } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              BizForm Guide
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              법인 설립 시점을 고민하는 스타트업·소상공인을 위한 맞춤형 의사결정 지원 서비스
            </p>
            {!user && (
              <Button onClick={signInWithGoogle} size="lg">
                Google로 시작하기
              </Button>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">맞춤형 추천</h3>
                <p className="text-gray-600">간단한 질문으로 최적의 사업 형태를 추천받으세요</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">체크리스트</h3>
                <p className="text-gray-600">단계별 필수 절차를 체크하며 진행하세요</p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">문서 생성</h3>
                <p className="text-gray-600">필요한 서류를 자동으로 생성하고 다운로드하세요</p>
              </div>
            </Card>
          </div>

          {user && (
            <Card className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                환영합니다, {user.displayName}님!
              </h2>
              <p className="text-gray-600 mb-6">
                법인 설립 여정을 시작해보세요
              </p>
              <div className="space-x-4">
                <Button onClick={() => window.location.href = '/onboarding'}>온보딩 시작하기</Button>
                <Button variant="outline" onClick={() => window.location.href = '/dashboard'}>대시보드 보기</Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};