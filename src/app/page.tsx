'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // 방문자 추적 함수
    const trackVisitor = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ip = data.ip;
        
        const userAgent = navigator.userAgent;
        const visitTime = new Date();
        
        await addDoc(collection(db, 'visitors'), {
          ip: ip,
          userAgent: userAgent,
          visitTime: visitTime,
          page: 'home',
          timestamp: new Date()
        });
        
        console.log('방문자 추적 완료:', ip);
      } catch (error) {
        console.error('방문자 추적 오류:', error);
      }
    };

    trackVisitor();

    const dontShow = localStorage.getItem('dontShowPopup');
    if (dontShow === 'true') {
      return;
    }

    console.log('팝업 타이머 시작...');
    const timer = setTimeout(() => {
      console.log('팝업 표시!');
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    if (dontShowAgain) {
      localStorage.setItem('dontShowPopup', 'true');
    }
    setShowPopup(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    console.log('폼 제출 시작...');
    console.log('Firebase db 객체:', db);
    
    try {
      await addDoc(collection(db, 'consultations'), {
        name: formData.get('name'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        message: formData.get('inquiry'),
        privacy: formData.get('privacy'),
        createdAt: new Date(),
        submittedAt: new Date().toISOString()
      });
      
      alert('상담 신청이 접수되었습니다. 24시간 내에 연락드리겠습니다.');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Firebase 저장 오류:', error);
      console.error('오류 상세:', JSON.stringify(error, null, 2));
      
      let errorMessage = '오류가 발생했습니다.';
      if (error instanceof Error) {
        errorMessage = `오류: ${error.message}`;
      }
      
      alert(`상담 신청 중 오류가 발생했습니다.\n${errorMessage}\n\n개발자 도구(F12) Console을 확인해주세요.`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Main Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
                     <div 
             className="absolute inset-0 bg-cover bg-center"
             style={{ backgroundImage: `url('/images/11.PNG')` }}
           />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white space-y-8">
              {/* Main Title */}
              <div className="space-y-4">
                <h1 className="text-6xl font-bold leading-tight">
                  IM THE FIRST
                </h1>
                <p className="text-xl text-gray-200 leading-relaxed">
                  노력에 실력을 더하여, 최초를 개척하는 박영준 법률사무소
                </p>
              </div>

              {/* Key Achievements */}
              <div className="space-y-3">
                <p className="text-lg text-orange-400 font-semibold">
                  국내최초 기업 상장 재승인
                </p>
                <p className="text-lg text-orange-400 font-semibold">
                  국내 주요 형사사건 무죄
                </p>
              </div>

              {/* Stats */}
              <div className="flex justify-center gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">12</div>
                  <div className="text-sm text-gray-300">년의 경험</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">900+</div>
                  <div className="text-sm text-gray-300">성공 사례</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400">91%</div>
                  <div className="text-sm text-gray-300">승소율</div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-8">
                <button 
                  onClick={() => {
                    const element = document.getElementById('contact-form');
                    if (element) {
                      element.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }
                  }}
                  className="bg-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors cursor-pointer"
                >
                  무료 상담 신청하기
                </button>
              </div>
            </div>
          </div>
        </div>


      </section>

                                                       {/* Contact Form Section */}
         <section id="contact-form" className="relative py-20 min-h-screen flex items-center bg-gray-600">
        
        <div className="relative z-10 w-full">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">무료 상담 신청하기</h2>
                <p className="text-gray-200">전문 변호사가 직접 상담해드립니다</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                    이름 *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="성함을 입력해주세요"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-300"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                    전화번호 *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="휴대폰번호를 입력해주세요"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-300"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-white mb-2">
                    상담 분야 *
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white"
                    required
                  >
                    <option value="" className="text-gray-800">상담 분야를 선택해주세요</option>
                    <option value="민사소송" className="text-gray-800">민사소송</option>
                    <option value="입찰권 분쟁" className="text-gray-800">입찰권 분쟁</option>
                    <option value="투자사기" className="text-gray-800">투자사기</option>
                    <option value="보이스피싱" className="text-gray-800">보이스피싱</option>
                    <option value="로맨스스캠" className="text-gray-800">로맨스스캠</option>
                    <option value="기타" className="text-gray-800">기타</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="inquiry" className="block text-sm font-medium text-white mb-2">
                    의뢰내용 *
                  </label>
                  <textarea
                    id="inquiry"
                    name="inquiry"
                    rows={4}
                    placeholder="대략적인 의뢰내용을 적어주세요"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-300"
                    required
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    className="mt-1 h-4 w-4 text-orange-500 focus:ring-orange-500 border-white/30 rounded bg-white/20"
                    required
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-200">
                    개인정보 수집 및 이용에 동의합니다. *
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors"
                >
                  무료 상담 신청하기
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-300">상담 신청 후 24시간 내에 연락드립니다</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Notice Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                <img 
                  src="/images/lg.PNG" 
                  alt="박영준 법률사무소 로고" 
                  className="w-16 h-16 object-contain rounded-lg filter brightness-0 invert"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">박영준 법률사무소</h2>
            </div>

            <div className="text-center space-y-4">
              <p className="text-gray-700 leading-relaxed">
                많은 분들이 신청 주셔서 정말 감사드립니다.
              </p>
              <p className="text-gray-700 leading-relaxed">
                현재 <span className="text-orange-500 font-bold">54명 상담 대기중</span>으로
                순차적으로 연락 드리고 있습니다. 평균 2일 이내로 연락드리고 있으니 조금만 기다려주시기 바랍니다.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center space-x-2">
              <input
                type="checkbox"
                id="dontShowAgain"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="dontShowAgain" className="text-sm text-gray-600">
                다시 열지 않기
              </label>
            </div>

            <div className="mt-6">
              <button
                onClick={handleClosePopup}
                className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

