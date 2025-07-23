

'use client';

import Link from 'next/link';

export default function Services() {
  // 실제 사례들 - 6장의 이미지 카드 (3, 4, 5, 6, 7, 8번 이미지 사용)
  const cases = [
    {
      id: 1,
      title: "정찰법 위기 구해 회복 사례",
      category: "정찰법",
      description: "공공기관 정찰 관련 위기 구해를 위한액 회수 성공",
      image: "/images/3.jpg",
      result: "위해금 100% 회수"
    },
    {
      id: 2,
      title: "골프 회원권 환불 성공 사례",
      category: "회원권",
      description: "골프장 폐업으로 인한 회원권 환불 소송 승소",
      image: "/images/4.jpg",
      result: "전액 환불 성공"
    },
    {
      id: 3,
      title: "가상화폐 투자사기 구제 사례",
      category: "투자사기",
      description: "가상화폐 투자사기로 인한 피해금 회수",
      image: "/images/5.jpg",
      result: "피해금 95% 회수"
    },
    {
      id: 4,
      title: "보이스피싱 피해 회복 사례",
      category: "보이스피싱",
      description: "전화금융사기 피해금 신속 회수",
      image: "/images/6.jpg",
      result: "피해금 90% 회수"
    },
    {
      id: 5,
      title: "펀드 사기 집단소송 사례",
      category: "투자사기",
      description: "대규모 펀드 사기 집단소송 승소",
      image: "/images/7.jpg",
      result: "집단소송 승소"
    },
    {
      id: 6,
      title: "쇼핑몰 사기 피해 회복 사례",
      category: "쇼핑몰사기",
      description: "온라인 쇼핑몰 사기 피해금 회수",
      image: "/images/8.jpg",
      result: "피해금 85% 회수"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">승소 사례</h1>
          <p className="text-xl text-gray-200">15년간 축적된 전문성으로 이루어낸 실제 성과</p>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-2xl font-bold text-center text-gray-800 mb-16">고객님들의 실제 승소내역과 함께 입증되는 성공 스토리</p>
          
          {/* 2행 3열 배치 - 완전히 새로운 방식 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            width: '100%'
          }}>
            {cases.map((caseItem) => (
              <div key={caseItem.id} className="bg-white rounded-lg shadow border border-gray-200">
                {/* 이미지 영역 - 카톡 스크린샷을 넣어주세요 */}
                <div className="aspect-[3/4] bg-gray-200 relative">
                  <img
                    src={caseItem.image}
                    alt={caseItem.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // 이미지 로드 실패시 placeholder 표시
                      e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400"><rect width="300" height="400" fill="%23f3f4f6"/><text x="50%" y="45%" text-anchor="middle" fill="%236b7280" font-size="16">카톡 승소 이미지</text><text x="50%" y="55%" text-anchor="middle" fill="%236b7280" font-size="14">준비중</text></svg>';
                    }}
                  />
                  
                  {/* 카테고리 뱃지 */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full">
                      {caseItem.category}
                    </span>
                  </div>
                </div>

                {/* 내용 영역 */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {caseItem.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {caseItem.description}
                  </p>
                  
                  {/* 결과 */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">결과</span>
                    <span className="text-sm font-semibold text-green-600">
                      {caseItem.result}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">누적 성과</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white rounded-lg p-6 shadow text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">900+</div>
              <div className="text-lg font-medium text-gray-700">승소 사례</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">91%</div>
              <div className="text-lg font-medium text-gray-700">승소율</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">190억</div>
              <div className="text-lg font-medium text-gray-700">피해금 회수액</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">4개월</div>
              <div className="text-lg font-medium text-gray-700">평균 해결기간</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">비슷한 피해를 당하셨나요?</h2>
          <p className="text-lg mb-8">
            위와 같은 성공 사례처럼 귀하의 피해도 반드시 회복될 수 있습니다.<br />
            지금 바로 무료 상담을 신청하여 전문가의 도움을 받아보세요.
          </p>
          <Link href="/contact" className="bg-white text-slate-700 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors block text-center">
            무료 상담 신청하기
          </Link>
        </div>
      </section>
    </div>
  );
} 
