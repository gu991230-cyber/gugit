'use client';

import { useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

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
      {/* 1. Main Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/images/11.PNG')` }}
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  의뢰인의 권리와 피해 회복에 집중 합니다
                </h1>
                <p className="text-2xl md:text-3xl font-semibold text-white">
                  믿을 수 있는 동반자 박영준 법률사무소입니다.
                </p>
                <p className="text-sm md:text-base text-gray-200 mt-2">
                  20년 경력과 400여건의 환불사례 80% 이상의 승소율로 증명합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 3. About Section - 4개 전문 분야 */}
      <section id="about" className="py-20 relative">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/images/558.jpg')` }}
          />
          <div className="absolute inset-0 bg-black/80" />
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
            <div className="text-white rounded-lg p-6 text-center" style={{ background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)' }}>
              <div className="text-4xl font-bold mb-2">4</div>
              <div className="text-lg font-medium">개월 평균 해결</div>
            </div>
          </div>

          {/* 변호사 소개 */}
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-8">전문 변호사 소개</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 w-full max-w-sm">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-4 overflow-hidden">
                    <img 
                      src="/images/park-youngjun.jpg" 
                      alt="박영준 대표변호사" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">박영준</h4>
                  <p className="font-medium" style={{ color: '#FFD700' }}>대표변호사</p>
                  <p className="text-sm text-gray-800 mt-1">12년 경력</p>
                </div>
                <div className="text-center">
                  <h5 className="text-lg font-bold text-gray-900 mb-2">경력</h5>
                  <ul className="space-y-1 text-xs md:text-sm leading-relaxed text-gray-800 text-left">
                    <li>• 남양주시 고문변호사</li>
                    <li>• 구리시의회 고문변호사</li>
                    <li>• 남양주시 복지재단 감사</li>
                    <li>• 남양주시 시민축구단 감사</li>
                    <li>• 남양주시 계약심의위원회 위원</li>
                    <li>• 남양주시 의료급여 재처분 심의위원회 위원</li>
                    <li>• 남양주시 신청사 건립기금 운용심의위원회 위원</li>
                    <li>• 의정부지방법원 남양주지원 민사조정위원</li>
                    <li>• 의정부지방검찰청 남양주지청 형사조정위원</li>
                    <li>• 의정부지방검찰청 형사상고 심의위원회 위원</li>
                    <li>• 의정부경찰서 경미범죄심사위원회 위원</li>
                    <li>• 구리경찰서 집시자문위원회 위원</li>
                    <li>• 구리경찰서 교통안전심의위원회 위원</li>
                    <li>• 법무법인 중부로 소속변호사</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 w-full max-w-sm">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-4 overflow-hidden">
                    <img 
                      src="/images/2.png" 
                      alt="김정훈 파트너변호사" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">김정훈</h4>
                  <p className="font-medium" style={{ color: '#FFD700' }}>파트너변호사</p>
                  <p className="text-sm text-gray-800 mt-1">8년 경력</p>
                </div>
                <div className="text-center">
                  <h5 className="text-lg font-bold text-gray-900 mb-2">경력</h5>
                  <ul className="space-y-1 text-sm text-gray-800">
                    <li>• 사법시험 55회 합격</li>
                    <li>• 사법연수원 46기 수료</li>
                    <li>• 공군법무관(국가소송)</li>
                    <li>• 서울중앙지방법원 조정위원</li>
                    <li>• 서울성동구청 고문변호사</li>
                  </ul>
                </div>
              </div>
              
              {/* New: 김희정 파트너변호사 */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 w-full max-w-sm">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-4 overflow-hidden">
                    <img 
                      src="/images/kim-heejung.jpg" 
                      alt="김희정 파트너변호사" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">김희정</h4>
                  <p className="font-medium" style={{ color: '#FFD700' }}>파트너변호사</p>
                </div>
                <div className="text-center">
                  <h5 className="text-lg font-bold text-gray-900 mb-2">경력</h5>
                  <ul className="space-y-1 text-xs md:text-sm leading-relaxed text-gray-800 text-left">
                    <li>• 서울대 졸업</li>
                    <li>• 사법고시시험 44회 합격</li>
                    <li>• 전 서울북부지방법원 조정위원</li>
                    <li>• 전 성남검찰청 검사직무대리</li>
                    <li>• 법무법인 소현, 주안 근무</li>
                  </ul>
                </div>
              </div>
              
              {/* New: 김주희 파트너변호사 */}
              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 w-full max-w-sm">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto mb-4 overflow-hidden">
                    <img 
                      src="/images/kim-juhee.jpg" 
                      alt="김주희 파트너변호사" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">김주희</h4>
                  <p className="font-medium" style={{ color: '#FFD700' }}>파트너변호사</p>
                </div>
                <div className="text-center">
                  <h5 className="text-lg font-bold text-gray-900 mb-2">경력</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Services Section - 승소 사례 */}
      <section id="services" className="py-20 relative bg-cover bg-center bg-no-repeat" style={{ 
        backgroundImage: `url('/images/2550.jpg')`,
        imageRendering: 'high-quality',
        WebkitImageRendering: 'high-quality',
        MozImageRendering: 'high-quality',
        msImageRendering: 'high-quality',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'contrast(1.1) saturate(1.1)',
        WebkitFilter: 'contrast(1.1) saturate(1.1)'
      }}>
        {/* Light Overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">승소 사례</h2>
            <p className="text-xl text-gray-200">12년간 축적된 전문성으로 이루어낸 실제 성과</p>
          </div>
          
          <p className="text-2xl font-bold text-center text-white mb-16">고객님들의 실제 승소내역과 함께 입증되는 성공 스토리</p>
          
          {/* 사례 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
            <div>
              <img
                src="/images/11.jpg?v=3"
                alt="로맨스스캠 피해 회복 사례"
                className="w-full h-auto"
              />
            </div>

              <div>
              <img
                src="/images/12.jpg?v=3"
                alt="골프 회원권 환불 성공 사례"
                className="w-full h-auto"
                />
              </div>

              <div>
              <img
                src="/images/13.jpg?v=3"
                alt="가상화폐 투자사기 구제 사례"
                className="w-full h-auto"
                />
              </div>

              <div>
              <img
                src="/images/14.jpg?v=3"
                alt="보이스피싱 피해 회복 사례"
                className="w-full h-auto"
                />
              </div>

              <div>
              <img
                src="/images/15.jpg?v=3"
                alt="펀드 사기 집단소송 사례"
                className="w-full h-auto"
                />
              </div>

            <div>
              <img
                src="/images/16.jpg?v=3"
                alt="쇼핑몰 사기 피해 회복 사례"
                className="w-full h-auto"
              />
            </div>
          </div>
          
          {/* 누적 성과 카드 제거 */}
        </div>
      </section>

      {/* 5. Contact Section - 연락처 (Google Maps) */}
      <section id="contact" className="py-20 bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Google Map */}
          <div className="h-[420px] w-full rounded-lg overflow-hidden shadow-lg">
            <iframe
              title="법률사무소 위치"
              src={`https://www.google.com/maps?q=${encodeURIComponent('대한민국 서울특별시 송파구 가락동 중대로 200 태화빌딩 2층 201호')}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          {/* Contact Details */}
          <div className="bg-gray-800/60 rounded-lg p-8 text-white flex flex-col justify-center shadow-lg">
            <div className="mb-6">
              <h2 className="text-4xl font-extrabold leading-tight">서울특별시</h2>
              <p className="text-3xl font-bold mt-2 leading-snug">송파구 가락동 중대로 200<br />태화빌딩 2층 201호</p>
            </div>
            <div className="space-y-2 mb-8 text-lg">
              <p>E. <a className="underline hover:opacity-90" href="mailto:YJPLAW515@gmail.com">YJPLAW515@gmail.com</a></p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <a href="mailto:YJPLAW515@gmail.com" className="rounded-md bg-white text-gray-900 py-3 text-center font-semibold">이메일 발송</a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Services Section - 서비스 안내 */}
      <section id="services" className="py-20 relative bg-cover bg-center bg-no-repeat" style={{ 
        backgroundImage: `url('/images/351.jpg')`,
        imageRendering: 'high-quality',
        WebkitImageRendering: 'high-quality',
        MozImageRendering: 'high-quality',
        msImageRendering: 'high-quality',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'contrast(1.1) saturate(1.1)',
        WebkitFilter: 'contrast(1.1) saturate(1.1)'
      }}>
        {/* Light Overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">서비스 안내</h2>
            <p className="text-lg text-gray-200">전문 분야별 맞춤형 법률 서비스를 제공합니다</p>
          </div>
          
          {/* 텍스트 전용 서비스 목록 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">부동산 분쟁</h3>
              <p className="text-gray-200 mb-2">재개발·수용 등 부동산 관련 분쟁 해결</p>
              <ul className="list-disc list-inside text-gray-200 space-y-1">
                <li>재개발사업 진행 과정에서 발생하는 각종 분쟁</li>
                <li>토지수용</li>
                <li>영업보상</li>
                <li>건물명도</li>
                <li>현금청산</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">회원권 분쟁</h3>
              <p className="text-gray-200 mb-2">골프장·콘도 회원권 관련 분쟁 해결</p>
              <ul className="list-disc list-inside text-gray-200 space-y-1">
                <li>골프 회원권 환불 소송</li>
                <li>콘도 회원권 피해 구제</li>
                <li>회원권 계약 분쟁 해결</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">투자사기 분야</h3>
              <p className="text-gray-200 mb-2">투자사기 피해 회복 및 손해배상</p>
              <ul className="list-disc list-inside text-gray-200 space-y-1">
                <li>폰지사기 피해 회복</li>
                <li>가상화폐 투자사기 구제</li>
                <li>투자 계약 사기 대응</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">보이스피싱 범죄</h3>
              <p className="text-gray-200 mb-2">전화금융사기 피해 구제 및 회복</p>
              <ul className="list-disc list-inside text-gray-200 space-y-1">
                <li>전화금융사기 피해 구제</li>
                <li>메신저 피싱 사건 대응</li>
                <li>사기 피해금 회수 소송</li>
              </ul>
            </div>
          </div>
 
          {/* 서비스 특징 블록 제거 요청에 따라 삭제 */}
        </div>
      </section>

      {/* 6. FAQ Section - 자주 묻는 질문 */}
      <section id="faq" className="py-20 relative bg-cover bg-center bg-no-repeat" style={{ 
        backgroundImage: `url('/images/661.jpg')`,
        imageRendering: 'high-quality',
        WebkitImageRendering: 'high-quality',
        MozImageRendering: 'high-quality',
        msImageRendering: 'high-quality',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'contrast(1.1) saturate(1.1)',
        WebkitFilter: 'contrast(1.1) saturate(1.1)'
      }}>
        {/* Light Overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">자주 묻는 질문</h2>
            <p className="text-xl text-gray-200">고객님들이 자주 문의하시는 내용입니다</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Q. 상담은 무료인가요?</h3>
                <p className="text-gray-700">네, 초기 상담은 무료로 진행됩니다. 30분 내외로 사건의 개요를 파악하고 승소 가능성을 검토해드립니다.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Q. 사기 피해 금액이 적어도 소송이 가능한가요?</h3>
                <p className="text-gray-700">피해 금액의 크기보다는 사건의 성격과 승소 가능성이 중요합니다. 소액이라도 명백한 사기 사건이라면 소송 진행이 가능합니다.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Q. 성공보수제로 진행 가능한가요?</h3>
                <p className="text-gray-700">사건의 성격과 승소 가능성에 따라 성공보수제 진행이 가능합니다. 일반적으로 착수금 + 성공보수 또는 순수 성공보수제 중 선택하실 수 있습니다.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Q. 사기 사건은 얼마나 빨리 대응해야 하나요?</h3>
                <p className="text-gray-700">사기 사건은 시간이 생명입니다. 특히 피해 직후 72시간 이내에 대응하는 것이 중요합니다. 빠른 대응으로 계좌 추적, 재산 보전, 증거 수집이 가능합니다.</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Q. 고소장 접수부터 결과까지 얼마나 걸리나요?</h3>
                <p className="text-gray-700">형사고소의 경우 2-6개월, 민사소송의 경우 6개월-1년 정도 소요됩니다. 다만 사건의 복잡성과 피고인의 협조 여부에 따라 달라질 수 있습니다.</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Q. 입찰 보증금을 돌려받지 못하고 있어요</h3>
                <p className="text-gray-700">입찰 보증금 미환급은 명백한 계약 위반입니다. 계약서, 입금 증명서, 의무 이행 증빙 등을 준비하시면 신속하게 회수할 수 있습니다.</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Q. 골프장/콘도 회원권이 휴지조각이 됐어요</h3>
                <p className="text-gray-700">회원권 사기는 매우 흔한 유형입니다. 회원권 매매계약서, 입금 증명서, 허위 정보 제공 증거 등을 바탕으로 손해배상과 형사고발이 가능합니다.</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Q. 원금 보장한다고 했는데 돈을 잃었어요</h3>
                <p className="text-gray-700">원금 보장 약속은 대부분 허위입니다. 투자 권유 과정의 녹음, 계약서, 허위 설명 증거 등을 수집하여 사기죄로 고발하고 손해배상을 청구할 수 있습니다.</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Q. 검찰/경찰 사칭 전화에 속아 송금했어요</h3>
                <p className="text-gray-700">보이스피싱 피해는 즉시 신고해야 합니다. 통화 내용, 송금 내역, 계좌 정보를 보존하고 지급정지 요청을 통해 피해 확산을 방지해야 합니다.</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">Q. 카카오톡/문자 메시지도 증거가 되나요?</h3>
                <p className="text-gray-700">네, 카카오톡과 문자 메시지는 중요한 증거입니다. 스크린샷과 함께 공증을 받거나, 디지털 포렌식을 통해 증거능력을 확보할 수 있습니다.</p>
              </div>
            </div>
          </div>
          
          {/* 사기 피해 해결 실적 */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-16">사기 피해 해결 실적</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-red-50 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">900+</div>
                <div className="text-lg font-medium text-gray-700">사기 사건 해결</div>
              </div>
              <div className="bg-red-50 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">91%</div>
                <div className="text-lg font-medium text-gray-700">피해 회수율</div>
              </div>
              <div className="bg-red-50 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">72H</div>
                <div className="text-lg font-medium text-gray-700">긴급 대응</div>
              </div>
              <div className="bg-red-50 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-red-600 mb-2">12년</div>
                <div className="text-lg font-medium text-gray-700">사기 전문 경력</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

