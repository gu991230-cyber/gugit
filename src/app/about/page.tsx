
'use client';

import Link from 'next/link';

export default function About() {
  const specialties = [
    {
      title: '입찰권 분야',
      items: [
        '공공기관 입찰 관련 분쟁 해결',
        '입찰 자격 제한 및 배제 구제',
        '낙찰자 선정 이의신청 대리'
      ]
    },
    {
      title: '회원권 분야',
      subtitle: '골프장·콘도',
      items: [
        '골프 회원권 환불 소송',
        '콘도 회원권 피해 구제',
        '회원권 관련 계약 분쟁 해결'
      ]
    },
    {
      title: '투자사기 분야',
      items: [
        '폰지사기 피해 회복',
        '가상화폐 투자사기 구제',
        '투자 계약 사기 손해배상'
      ]
    },
    {
      title: '보이스피싱 범죄',
      items: [
        '전화금융사기 피해 구제',
        '메신저 피싱 사건 대응',
        '사기 피해금 회수 소송'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* 메인 타이틀 섹션 */}
      <section className="bg-gray-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">4개 전문 분야, 완벽한 해결책</h1>
          <p className="text-xl text-gray-200">입찰권·회원권·투자사기·보이스피싱 전문 법무법인</p>
        </div>
      </section>

      {/* 전문 분야 소개 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">저희가 집중하는 4가지 전문 분야</h2>
          <p className="text-lg text-center text-gray-600 mb-16">각 분야별 전문성으로 최고의 결과를 제공합니다</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialties.map((specialty, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{specialty.title}</h3>
                {specialty.subtitle && (
                  <p className="text-orange-600 font-medium mb-4">({specialty.subtitle})</p>
                )}
                <ul className="space-y-2">
                  {specialty.items.map((item, idx) => (
                    <li key={idx} className="text-gray-600">• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 성과 섹션 */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">검증된 전문성</h2>
          <p className="text-lg text-center text-gray-600 mb-16">수치로 증명하는 우리의 실력</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-orange-500 text-white rounded-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2">15</div>
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
        </div>
      </section>

      {/* 전문화 이유 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">왜 전문화인가?</h2>
          <h3 className="text-xl font-bold text-center text-orange-600 mb-4">선택과 집중의 철학</h3>
          <p className="text-lg text-center text-gray-600 mb-16 max-w-4xl mx-auto">
            저희는 모든 분야를 다루지 않습니다. 오직 4개 전문 분야에서만 최고의 결과를 만들어냅니다.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow p-6 flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">깊은 전문성</h4>
                <p className="text-gray-600">각 분야별 판례와 법리에 대한 완벽한 이해</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">축적된 노하우</h4>
                <p className="text-gray-600">동일 유형 사건 900여 건의 처리 경험</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">빠른 해결</h4>
                <p className="text-gray-600">전문 분야 집중으로 신속한 사건 처리</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">✓</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">높은 성공률</h4>
                <p className="text-gray-600">전문성 기반 91% 승소율 달성</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 변호사 소개 */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">전문 변호사 소개</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
            {/* 김정숙 대표변호사 */}
            <div className="bg-white rounded-lg shadow p-6 w-full max-w-sm">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  <img 
                    src="/images/kim-jungsook.jpg.jpg" 
                    alt="김정숙 대표변호사" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.className = 'w-24 h-24 bg-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center';
                        parent.innerHTML = '<div class="flex items-baseline"><span class="text-3xl font-bold text-white">J</span><span class="text-lg font-bold text-white ml-1">S</span></div>';
                      }
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">김정숙</h3>
                <p className="text-orange-600 font-medium">대표변호사</p>
                <p className="text-sm text-gray-600 mt-1">15년 경력</p>
              </div>
              
              <div className="space-y-4 text-center">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">학력 및 경력</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 고려대학교 법학과</li>
                    <li>• 북경대학교 법학박사</li>
                    <li>• 사법연수원 38기</li>
                    <li>• 금융범죄특위 위원</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">전문 분야</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 입찰권 분야</li>
                    <li>• 투자사기 분야</li>
                    <li>• 보이스피싱 범죄</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 박민수 변호사 */}
            <div className="bg-white rounded-lg shadow p-6 w-full max-w-sm">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  <img 
                    src="/images/park-minsu.jpg.jpg" 
                    alt="박민수 변호사" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.className = 'w-24 h-24 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center';
                        parent.innerHTML = '<div class="flex items-baseline"><span class="text-3xl font-bold text-white">P</span><span class="text-lg font-bold text-white ml-1">M</span></div>';
                      }
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">박민수</h3>
                <p className="text-blue-600 font-medium">수습변호사</p>
                <p className="text-sm text-gray-600 mt-1">3년 경력</p>
              </div>
              
              <div className="space-y-4 text-center">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">학력 및 경력</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 건국대학교 로스쿨</li>
                    <li>• 사법연수원 43기</li>
                    <li>• 전 검찰청 특수부</li>
                    <li>• 전 법무법인 태신</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">전문 분야</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 회원권 분야</li>
                    <li>• 민사소송</li>
                    <li>• 계약 분쟁</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 이수진 변호사 */}
            <div className="bg-white rounded-lg shadow p-6 w-full max-w-sm">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                  <img 
                    src="/images/lee-sujin.jpg.jpg" 
                    alt="이수진 변호사" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.className = 'w-24 h-24 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center';
                        parent.innerHTML = '<div class="flex items-baseline"><span class="text-3xl font-bold text-white">L</span><span class="text-lg font-bold text-white ml-1">S</span></div>';
                      }
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">이수진</h3>
                <p className="text-green-600 font-medium">전문변호사</p>
                <p className="text-sm text-gray-600 mt-1">10년 경력</p>
              </div>
              
              <div className="space-y-4 text-center">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">학력 및 경력</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 고려대학교 로스쿨</li>
                    <li>• 사법연수원 40기</li>
                    <li>• 전 법무법인 김앤장</li>
                    <li>• 전 법무법인 태신</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">전문 분야</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• 투자사기 분야</li>
                    <li>• 금융범죄</li>
                    <li>• 피해자 구제</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 상담 과정 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">상담부터 해결까지</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-4">1단계</div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">무료 상담</h4>
              <ul className="text-gray-600 space-y-2">
                <li>• 사건 개요 파악</li>
                <li>• 승소 가능성 검토</li>
                <li>• 예상 소요 기간 안내</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-4">2단계</div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">전략 수립</h4>
              <ul className="text-gray-600 space-y-2">
                <li>• 상세 사실관계 조사</li>
                <li>• 최적 법적 전략 수립</li>
                <li>• 투명한 비용 안내</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-4">3단계</div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">사건 해결</h4>
              <ul className="text-gray-600 space-y-2">
                <li>• 신속한 법적 절차 진행</li>
                <li>• 실시간 진행상황 공유</li>
                <li>• 최대한의 피해 회복</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-slate-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">지금 바로 전문가와 상담하세요</h2>
          <p className="text-lg mb-8">
            15년 전문 경력의 김정숙 변호사가 직접 상담해드립니다.<br />
            첫 상담은 무료이며, 24시간 내에 답변드립니다.
          </p>
          <Link href="/contact" className="bg-white text-slate-700 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors block text-center">
            무료 상담 신청하기
          </Link>
        </div>
      </section>
    </div>
  );
} 