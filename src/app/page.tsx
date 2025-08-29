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

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">4개 전문 분야, 완벽한 해결책</h2>
          <p className="text-lg text-center text-gray-600 mb-16">입찰권·회원권·투자사기·보이스피싱 전문 법무법인</p>
          
          {/* 전문 분야 소개 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">입찰권 분야</h3>
              <ul className="space-y-2">
                <li className="text-gray-600">• 공공기관 입찰 관련 분쟁 해결</li>
                <li className="text-gray-600">• 입찰 자격 제한 및 배제 구제</li>
                <li className="text-gray-600">• 낙찰자 선정 이의신청 대리</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">회원권 분야</h3>
              <p className="text-orange-500 font-medium mb-4">(골프장·콘도)</p>
              <ul className="space-y-2">
                <li className="text-gray-600">• 골프 회원권 환불 소송</li>
                <li className="text-gray-600">• 콘도 회원권 피해 구제</li>
                <li className="text-gray-600">• 회원권 관련 계약 분쟁 해결</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">투자사기 분야</h3>
              <ul className="space-y-2">
                <li className="text-gray-600">• 폰지사기 피해 회복</li>
                <li className="text-gray-600">• 가상화폐 투자사기 구제</li>
                <li className="text-gray-600">• 투자 계약 사기 손해배상</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">보이스피싱 범죄</h3>
              <ul className="space-y-2">
                <li className="text-gray-600">• 전화금융사기 피해 구제</li>
                <li className="text-gray-600">• 메신저 피싱 사건 대응</li>
                <li className="text-gray-600">• 사기 피해금 회수 소송</li>
              </ul>
            </div>
          </div>

          {/* 성과 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="bg-orange-500 text-white rounded-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2">12</div>
              <div className="text-lg font-medium">년 전문 경력</div>
            </div>
            <div className="bg-orange-500 text-white rounded-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2">900+</div>
              <div className="text-lg font-medium">건 성공 사례</div>
            </div>
            <div className="bg-orange-500 text-white rounded-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2">91%</div>
              <div className="text-lg font-medium">승소율</div>
            </div>
            <div className="bg-orange-500 text-white rounded-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2">4</div>
              <div className="text-lg font-medium">개월 평균 해결</div>
            </div>
          </div>

          {/* 변호사 소개 */}
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">전문 변호사 소개</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
              <div className="bg-white rounded-lg shadow p-6 w-full max-w-sm">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <img 
                      src="/images/park-youngjun.jpg" 
                      alt="박영준 대표변호사" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">박영준</h4>
                  <p className="text-orange-500 font-medium">대표변호사</p>
                  <p className="text-sm text-gray-600 mt-1">12년 경력</p>
                </div>
                <div className="text-center">
                  <h5 className="text-lg font-bold text-gray-900 mb-2">전문 분야</h5>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 입찰권 분야</li>
                    <li>• 투자사기 분야</li>
                    <li>• 보이스피싱 범죄</li>
                  </ul>
                </div>
              </div>
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
                  src="/images/115.PNG" 
                  alt="박영준 법률사무소 로고" 
                  className="w-16 h-16 object-contain rounded-lg"
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

