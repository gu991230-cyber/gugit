'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 "다시 열지 않기" 설정 확인
    const dontShow = localStorage.getItem('dontShowPopup');
    if (dontShow === 'true') {
      return; // 이미 "다시 열지 않기"로 설정되어 있으면 팝업 표시 안함
    }

    // 페이지 로드 후 3초 뒤에 팝업 표시
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
        email: formData.get('email') || '',
        service: '일반 상담',
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
      
      // 더 자세한 에러 메시지 제공
      let errorMessage = '오류가 발생했습니다.';
      if (error instanceof Error) {
        errorMessage = `오류: ${error.message}`;
      }
      
      alert(`상담 신청 중 오류가 발생했습니다.\n${errorMessage}\n\n개발자 도구(F12) Console을 확인해주세요.`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center filter blur-md"
            style={{ backgroundImage: `url('/images/buil.jpg')` }}
          />
          <div className="absolute inset-0 bg-white/50" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center w-full">
          {/* Logo */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-4">
              <img 
                src="/images/lg.PNG" 
                alt="김정숙 법률사무소 로고" 
                className="w-20 h-20 object-contain rounded-xl drop-shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(234, 90, 43, 0.05) 0%, rgba(251, 146, 60, 0.05) 100%)',
                  padding: '4px'
                }}
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">김정숙 법률사무소</h1>
            <p className="text-gray-600">신뢰받는 법률 서비스</p>
          </div>

          {/* Main Message */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              저희는 특화된 분야의 선택과 집중을 합니다.
            </h2>
            <p className="text-xl text-orange-500 font-bold mb-2">입찰권·회원권·투자사기·폰지사기·전화사기 분야의</p>
            <p className="text-xl text-gray-900 mb-4">완벽한 피해 회복으로 고객의 신뢰를 이끌어가겠습니다.</p>
            <p className="text-lg text-gray-600">12년의 경험으로 축적된 전문성과 신뢰성</p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-6 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 shadow p-6 text-center">
              <div className="text-2xl font-bold text-orange-500 mb-1">15</div>
              <div className="text-sm font-medium text-gray-600">년의 경험</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 shadow p-6 text-center">
              <div className="text-2xl font-bold text-orange-500 mb-1">900+</div>
              <div className="text-sm font-medium text-gray-600">성공 사례</div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 shadow p-6 text-center">
              <div className="text-2xl font-bold text-orange-500 mb-1">91%</div>
              <div className="text-sm font-medium text-gray-600">승소율</div>
            </div>
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => {
              const element = document.getElementById('contact-form');
              if (element) {
                element.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
                // 스크롤 완료 후 이름 입력란에 포커스
                setTimeout(() => {
                  const nameInput = document.getElementById('name');
                  if (nameInput) {
                    nameInput.focus();
                  }
                }, 500);
              }
            }}
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors cursor-pointer"
          >
            무료 상담 신청하기
          </button>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="bg-white py-20">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-gray-50 rounded-xl p-8 border-2 border-transparent hover:border-orange-200 transition-all duration-300 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">무료 상담 신청하기</h2>
              <p className="text-lg text-gray-600">전문 변호사가 직접 상담해드립니다</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  이름 *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="성함을 입력해주세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  전화번호 *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="휴대폰번호를 입력해주세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="이메일을 입력해주세요 (선택사항)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <div>
                <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 mb-2">
                  의뢰내용 *
                </label>
                <textarea
                  id="inquiry"
                  name="inquiry"
                  rows={6}
                  placeholder="대략적인 의뢰내용을 적어주세요"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="privacy"
                  name="privacy"
                  className="mt-1 h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="privacy" className="text-sm text-gray-600">
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
                <p className="text-sm text-gray-500">상담 신청 후 24시간 내에 연락드립니다</p>
              </div>
            </form>
          </div>
        </div>
             </section>

       {/* Notice Popup */}
       {showPopup && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
             {/* Close Button */}
             <button
               onClick={() => setShowPopup(false)}
               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
             >
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
               </svg>
             </button>

                           {/* Logo */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                  <img 
                    src="/images/lg.PNG" 
                    alt="김정숙 법률사무소 로고" 
                    className="w-16 h-16 object-contain rounded-lg"
                    style={{
                      background: 'linear-gradient(135deg, rgba(234, 90, 43, 0.1) 0%, rgba(251, 146, 60, 0.1) 100%)',
                      padding: '2px'
                    }}
                  />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">김정숙 법률사무소</h2>
              </div>

              {/* Notice Content */}
              <div className="text-center space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  많은 분들이 신청 주셔서 정말 감사드립니다.
                </p>
                                 <p className="text-gray-700 leading-relaxed">
                   현재 <span className="text-orange-500 font-bold">118명 상담 대기중</span>으로 
                   순차적으로 연락 드리고 있습니다. 평균 4일 이내로 연락드리고 있으니 조금만 기다려주시기 바랍니다.
                 </p>
              </div>

                           {/* Don't Show Again Checkbox */}
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

              {/* Confirm Button */}
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

