'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

const ConsultationBar = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleConsultationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('🚀🚀🚀 폼 제출 시작됨 - handleConsultationSubmit 호출됨');
    setIsSubmitting(true);
    setSubmitMessage('');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const privacy = formData.get('privacy') as string;

    console.log('🚀 폼 데이터:', { name, phone, privacy });

    if (!name || !phone) {
      console.log('🚀 유효성 검사 실패: 이름 또는 연락처 누락');
      setSubmitMessage('이름과 연락처를 모두 입력해주세요.');
      setIsSubmitting(false);
      return;
    }

    if (!privacy) {
      console.log('🚀 유효성 검사 실패: 개인정보 동의 누락');
      setSubmitMessage('개인정보 수집 동의를 체크해주세요.');
      setIsSubmitting(false);
      return;
    }

    console.log('🚀 유효성 검사 통과, Firebase 저장 시도...');

    try {
      console.log('Firebase에 데이터 저장 시도...');
      console.log('Firebase db 객체:', db);
      
      const docRef = await addDoc(collection(db, 'consultations'), {
        name: name,
        phone: phone,
        service: '빠른 상담 신청',
        message: '고정 하단 바를 통한 상담 신청',
        privacy: privacy,
        createdAt: new Date(),
        submittedAt: new Date().toISOString(),
        source: 'fixed-bottom-bar'
      });

      console.log('문서가 성공적으로 저장됨:', docRef.id);
      setSubmitMessage('상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.');
      
      // 폼 초기화
      e.currentTarget.reset();
      
    } catch (error) {
      console.error('상담 신청 오류:', error);
      setSubmitMessage(`상담 신청 중 오류가 발생했습니다: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-[9999] bg-gray-800/95 border border-gray-600 shadow-2xl rounded-lg mx-4 md:mx-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleConsultationSubmit} className="flex flex-col lg:flex-row justify-between items-center py-3 lg:py-4 space-y-3 lg:space-y-0">
          {/* Left Section - Contact Info */}
          <div className="flex items-center space-x-6 text-white">
            <div className="flex items-center space-x-2">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="text-lg font-bold">1:1 빠른 상담 신청하기</span>
            </div>
          </div>
          
          {/* Center Section - Input Fields */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              name="name"
              placeholder="이름"
              required
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="연락처"
              required
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Right Section - Agreement & Submit */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="privacy"
                id="privacy-agreement"
                required
                className="w-4 h-4 border border-white rounded bg-transparent"
              />
              <label htmlFor="privacy-agreement" className="text-white text-sm">
                개인정보수집동의 <span className="underline cursor-pointer">[취급방침]</span>
              </label>
            </div>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 text-white px-6 py-2 rounded font-medium hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '처리중...' : '상담 신청'}
            </button>
          </div>
        </form>
        
        {/* Submit Message */}
        {submitMessage && (
          <div className={`text-center text-sm mt-2 ${submitMessage.includes('완료') ? 'text-green-400' : 'text-red-400'}`}>
            {submitMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationBar;
