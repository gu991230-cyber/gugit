'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs, query, where, orderBy } from 'firebase/firestore';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
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
  }, []);

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
                                 <p className="text-lg font-semibold" style={{ color: '#FFD700' }}>
                   국내최초 기업 상장 재승인
                 </p>
                 <p className="text-lg font-semibold" style={{ color: '#FFD700' }}>
                   국내 주요 형사사건 무죄
                 </p>
              </div>

              {/* Stats */}
              <div className="flex justify-center gap-8 pt-8">
                                 <div className="text-center">
                   <div className="text-3xl font-bold" style={{ color: '#FFD700' }}>12</div>
                   <div className="text-sm text-gray-300">년의 경험</div>
                 </div>
                 <div className="text-center">
                   <div className="text-3xl font-bold" style={{ color: '#FFD700' }}>900+</div>
                   <div className="text-sm text-gray-300">성공 사례</div>
                 </div>
                 <div className="text-center">
                   <div className="text-3xl font-bold" style={{ color: '#FFD700' }}>91%</div>
                   <div className="text-sm text-gray-300">승소율</div>
                 </div>
              </div>

              
            </div>
          </div>
        </div>


      </section>

                                                       {/* Contact Form Section */}
         <section id="contact-form" className="relative py-20 bg-gray-800">
        
        <div className="relative z-10 w-full">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">무료 상담 신청</h2>
                <p className="text-gray-600">전문 변호사가 직접 상담해드립니다</p>
              </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      이름 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="성함을 입력해주세요"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    상담 분야 *
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                   <option value="">상담 분야를 선택해주세요</option>
                   <option value="입찰권 분쟁">입찰권 분쟁</option>
                   <option value="회원권 분쟁">회원권 분쟁</option>
                   <option value="투자사기">투자사기</option>
                   <option value="보이스피싱">보이스피싱</option>
                   <option value="기타">기타</option>
                 </select>
                </div>

                <div>
                  <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700 mb-2">
                    의뢰내용 *
                  </label>
                  <textarea
                    id="inquiry"
                    name="inquiry"
                    rows={4}
                    placeholder="대략적인 의뢰내용을 적어주세요"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    name="privacy"
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    required
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-700">
                    개인정보 수집 및 이용에 동의합니다. *
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
                >
                  무료 상담 신청하기
                </button>

                <div className="text-center">
                  <p className="text-sm text-gray-600">상담 신청 후 24시간 내에 연락드립니다</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
                 {/* Background Image */}
         <div className="absolute inset-0">
           <div 
             className="absolute inset-0 bg-cover bg-center"
             style={{ backgroundImage: `url('/images/558.jpg')` }}
           />
           <div className="absolute inset-0 bg-black/70" />
         </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-4">4개 전문 분야, 완벽한 해결책</h2>
          <p className="text-lg text-center text-gray-200 mb-16">입찰권·회원권·투자사기·보이스피싱 전문 법무법인</p>
          
          {/* 전문 분야 소개 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">입찰권 분야</h3>
              <ul className="space-y-2">
                <li className="text-gray-700">• 공공기관 입찰 관련 분쟁 해결</li>
                <li className="text-gray-700">• 입찰 자격 제한 및 배제 구제</li>
                <li className="text-gray-700">• 낙찰자 선정 이의신청 대리</li>
              </ul>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">회원권 분야</h3>
                             <p className="font-medium mb-4" style={{ color: '#FFD700' }}>(골프장·콘도)</p>
              <ul className="space-y-2">
                <li className="text-gray-700">• 골프 회원권 환불 소송</li>
                <li className="text-gray-700">• 콘도 회원권 피해 구제</li>
                <li className="text-gray-700">• 회원권 관련 계약 분쟁 해결</li>
              </ul>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">투자사기 분야</h3>
              <ul className="space-y-2">
                <li className="text-gray-700">• 폰지사기 피해 회복</li>
                <li className="text-gray-700">• 가상화폐 투자사기 구제</li>
                <li className="text-gray-700">• 투자 계약 사기 손해배상</li>
              </ul>
            </div>
            <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">보이스피싱 범죄</h3>
              <ul className="space-y-2">
                <li className="text-gray-700">• 전화금융사기 피해 구제</li>
                <li className="text-gray-700">• 메신저 피싱 사건 대응</li>
                <li className="text-gray-700">• 사기 피해금 회수 소송</li>
              </ul>
            </div>
          </div>

          {/* 성과 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                         <div className="text-white rounded-lg p-6 text-center" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' }}>
               <div className="text-4xl font-bold mb-2">12</div>
               <div className="text-lg font-medium">년 전문 경력</div>
             </div>
             <div className="text-white rounded-lg p-6 text-center" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' }}>
               <div className="text-4xl font-bold mb-2">900+</div>
               <div className="text-lg font-medium">건 성공 사례</div>
             </div>
             <div className="text-white rounded-lg p-6 text-center" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' }}>
               <div className="text-4xl font-bold mb-2">91%</div>
               <div className="text-lg font-medium">승소율</div>
             </div>
             <div className="text-white rounded-lg p-6 text-center" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFD700 0%, #FFA500 100%)' }}>
               <div className="text-4xl font-bold mb-2">4</div>
               <div className="text-lg font-medium">개월 평균 해결</div>
             </div>
          </div>

          {/* 변호사 소개 */}
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-8">전문 변호사 소개</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 w-full max-w-sm">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <img 
                      src="/images/park-youngjun.jpg" 
                      alt="박영준 대표변호사" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">박영준</h4>
                                     <p className="font-medium" style={{ color: '#FFD700' }}>대표변호사</p>
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
              
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 w-full max-w-sm">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                    <img 
                      src="/images/2.png" 
                      alt="김정훈 파트너변호사" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">김정훈</h4>
                  <p className="font-medium" style={{ color: '#FFD700' }}>파트너변호사</p>
                  <p className="text-sm text-gray-600 mt-1">8년 경력</p>
                </div>
                <div className="text-center">
                  <h5 className="text-lg font-bold text-gray-900 mb-2">전문 분야</h5>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 회원권 분야</li>
                    <li>• 민사소송</li>
                    <li>• 계약 분쟁</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">연락처</h2>
            <p className="text-lg text-gray-600">언제든지 편하게 연락주세요</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.554.554l3.644 3.644a1 1 0 01.554.554V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12l-4-4-4 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">주소</h3>
              <p className="text-gray-600">서울특별시 강남구 테헤란로 123<br />법무법인 빌딩 5층</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.554.554l3.644 3.644a1 1 0 01.554.554V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12l-4-4-4 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">전화</h3>
              <p className="text-gray-600">02-1234-5678</p>
              <p className="text-gray-600">010-1111-2222</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.554.554l3.644 3.644a1 1 0 01.554.554V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12l-4-4-4 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">이메일</h3>
              <p className="text-gray-600">info@parkyoungjunlaw.com</p>
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">상담 시간</h3>
            <div className="bg-white rounded-lg shadow-lg p-6 inline-block">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">평일</h4>
                  <p className="text-gray-600">09:00 - 18:00</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">토요일</h4>
                  <p className="text-gray-600">09:00 - 13:00</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">일요일 및 공휴일 휴무</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">자주 묻는 질문</h2>
            <p className="text-lg text-gray-600">고객님들이 자주 문의하시는 내용입니다</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Q. 상담은 무료인가요?</h3>
              <p className="text-gray-700">네, 초기 상담은 무료로 진행됩니다. 구체적인 사건 분석과 해결 방안을 제시해드립니다.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Q. 상담 신청 후 언제 연락받을 수 있나요?</h3>
              <p className="text-gray-700">상담 신청 후 24시간 내에 전문 변호사가 직접 연락드립니다.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Q. 원격 상담도 가능한가요?</h3>
              <p className="text-gray-700">네, 전화나 화상회의를 통한 원격 상담도 가능합니다. 편의에 맞춰 선택하실 수 있습니다.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Q. 소송 진행 기간은 얼마나 걸리나요?</h3>
              <p className="text-gray-700">사건의 복잡도에 따라 다르지만, 평균적으로 4-6개월 정도 소요됩니다.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Q. 성공 사례가 있나요?</h3>
              <p className="text-gray-700">네, 900건 이상의 성공 사례가 있으며, 91%의 높은 승소율을 자랑합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">서비스 안내</h2>
            <p className="text-lg text-gray-600">전문 분야별 맞춤형 법률 서비스를 제공합니다</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">입찰권 분쟁</h3>
              <p className="text-gray-600 mb-4">공공기관 입찰 관련 분쟁 해결 및 구제</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 입찰 자격 제한 구제</li>
                <li>• 낙찰자 선정 이의신청</li>
                <li>• 입찰 관련 소송 대리</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">회원권 분쟁</h3>
              <p className="text-gray-600 mb-4">골프장·콘도 회원권 관련 분쟁 해결</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 골프 회원권 환불 소송</li>
                <li>• 콘도 회원권 피해 구제</li>
                <li>• 회원권 계약 분쟁 해결</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">투자사기 분야</h3>
              <p className="text-gray-600 mb-4">투자사기 피해 회복 및 손해배상</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 폰지사기 피해 회복</li>
                <li>• 가상화폐 투자사기 구제</li>
                <li>• 투자 계약 사기 대응</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.554.554l3.644 3.644a1 1 0 01.554.554V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">보이스피싱 범죄</h3>
              <p className="text-gray-600 mb-4">전화금융사기 피해 구제 및 회복</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 전화금융사기 피해 구제</li>
                <li>• 메신저 피싱 사건 대응</li>
                <li>• 사기 피해금 회수 소송</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <div className="bg-white rounded-lg shadow-lg p-8 inline-block max-w-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">서비스 특징</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">전문성</h4>
                  <p className="text-gray-600">각 분야별 전문 변호사가 담당</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">신속성</h4>
                  <p className="text-gray-600">24시간 내 초기 상담 응답</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">성공률</h4>
                  <p className="text-gray-600">91%의 높은 승소율 보장</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}

