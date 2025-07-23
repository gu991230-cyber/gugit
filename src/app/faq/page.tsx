'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'general', name: '일반 문의' },
    { id: 'bidding', name: '입찰권 사기' },
    { id: 'membership', name: '회원권 사기' },
    { id: 'investment', name: '투자사기' },
    { id: 'voicephishing', name: '보이스피싱' },
    { id: 'evidence', name: '증거/회복' }
  ];

  const faqData = [
    // 일반 문의
    {
      id: 'general-1',
      category: 'general',
      question: '첫 상담료는 얼마인가요?',
      answer: '첫 상담은 무료입니다. 30분 내외로 사건의 개요를 파악하고 승소 가능성을 검토해드립니다. 전화, 방문, 화상상담 모두 가능합니다.'
    },
    {
      id: 'general-2',
      category: 'general',
      question: '사기 피해 금액이 적어도 소송이 가능한가요?',
      answer: '피해 금액의 크기보다는 사건의 성격과 승소 가능성이 중요합니다. 소액이라도 명백한 사기 사건이라면 소송 진행이 가능합니다. 다만, 비용 대비 효과를 고려하여 상담 시 자세히 검토해드립니다.'
    },
    {
      id: 'general-3',
      category: 'general',
      question: '성공보수제로 진행 가능한가요?',
      answer: '사건의 성격과 승소 가능성에 따라 성공보수제 진행이 가능합니다. 일반적으로 착수금 + 성공보수 또는 순수 성공보수제 중 선택하실 수 있습니다.'
    },
    {
      id: 'general-4',
      category: 'general',
      question: '사기 사건은 얼마나 빨리 대응해야 하나요?',
      answer: '사기 사건은 시간이 생명입니다. 특히 피해 직후 72시간 이내에 대응하는 것이 중요합니다. 빠른 대응으로 계좌 추적, 재산 보전, 증거 수집이 가능합니다.'
    },
    {
      id: 'general-5',
      category: 'general',
      question: '고소장 접수부터 결과까지 얼마나 걸리나요?',
      answer: '형사고소의 경우 2-6개월, 민사소송의 경우 6개월-1년 정도 소요됩니다. 다만 사건의 복잡성과 피고인의 협조 여부에 따라 달라질 수 있습니다.'
    },

    // 입찰권 사기
    {
      id: 'bidding-1',
      category: 'bidding',
      question: '입찰 보증금을 돌려받지 못하고 있어요',
      answer: '입찰 보증금 미환급은 명백한 계약 위반입니다. 계약서, 입금 증명서, 의무 이행 증빙 등을 준비하시면 신속하게 회수할 수 있습니다. 평균 2-3개월 내 해결됩니다.'
    },
    {
      id: 'bidding-2',
      category: 'bidding',
      question: '허위 입찰 정보로 손해를 봤어요',
      answer: '허위 입찰 정보 제공은 사기죄에 해당합니다. 입찰 공고문, 계약서, 실제 입찰 결과 등을 비교 분석하여 허위성을 입증하고 손해배상을 청구할 수 있습니다.'
    },
    {
      id: 'bidding-3',
      category: 'bidding',
      question: '입찰 담합 피해를 입었는데 증명이 가능한가요?',
      answer: '입찰 담합은 입찰 과정의 불합리성, 가격 조작 흔적, 참여업체 간 연관성 등으로 입증 가능합니다. 공정거래위원회 신고와 병행하여 손해배상 청구가 가능합니다.'
    },

    // 회원권 사기
    {
      id: 'membership-1',
      category: 'membership',
      question: '골프장/콘도 회원권이 휴지조각이 됐어요',
      answer: '회원권 사기는 매우 흔한 유형입니다. 회원권 매매계약서, 입금 증명서, 허위 정보 제공 증거 등을 바탕으로 손해배상과 형사고발이 가능합니다.'
    },
    {
      id: 'membership-2',
      category: 'membership',
      question: '회원권 양도양수 계약이 사기였어요',
      answer: '회원권 양도양수 사기의 경우, 회원권의 실존 여부, 권리 관계, 매도인의 권한 등을 확인하여 사기 여부를 판단합니다. 대부분 형사고발과 민사소송으로 해결됩니다.'
    },
    {
      id: 'membership-3',
      category: 'membership',
      question: '회원권 시세조작으로 손해를 봤어요',
      answer: '회원권 시세조작은 허위 정보 제공에 의한 사기입니다. 시세 정보의 허위성, 고의성을 입증하여 손해배상을 청구할 수 있습니다.'
    },

    // 투자사기
    {
      id: 'investment-1',
      category: 'investment',
      question: '원금 보장한다고 했는데 돈을 잃었어요',
      answer: '원금 보장 약속은 대부분 허위입니다. 투자 권유 과정의 녹음, 계약서, 허위 설명 증거 등을 수집하여 사기죄로 고발하고 손해배상을 청구할 수 있습니다.'
    },
    {
      id: 'investment-2',
      category: 'investment',
      question: '가상화폐 투자 사기를 당했어요',
      answer: '가상화폐 투자 사기는 최근 급증하는 범죄 유형입니다. 투자 플랫폼 정보, 거래 내역, 상대방과의 대화 내용 등을 보존하여 신속히 신고해야 합니다.'
    },
    {
      id: 'investment-3',
      category: 'investment',
      question: '다단계 투자에서 피해를 봤어요',
      answer: '다단계 투자는 대부분 폰지사기 구조입니다. 투자 구조도, 수익 배분 방식, 신규 투자자 모집 과정 등을 분석하여 불법성을 입증할 수 있습니다.'
    },
    {
      id: 'investment-4',
      category: 'investment',
      question: '피해자가 많은데 집단소송이 가능한가요?',
      answer: '네, 집단소송(집단분쟁조정)이 가능합니다. 피해자가 많을수록 승소 가능성이 높아지고, 비용 부담도 줄어듭니다. 피해자 모임 구성을 도와드립니다.'
    },

    // 보이스피싱
    {
      id: 'voicephishing-1',
      category: 'voicephishing',
      question: '검찰/경찰 사칭 전화에 속아 송금했어요',
      answer: '보이스피싱 피해는 즉시 신고해야 합니다. 통화 내용, 송금 내역, 계좌 정보를 보존하고 지급정지 요청을 통해 피해 확산을 방지해야 합니다.'
    },
    {
      id: 'voicephishing-2',
      category: 'voicephishing',
      question: '대출 빙자 사기로 돈을 보냈어요',
      answer: '대출 빙자 사기는 선수금 명목으로 돈을 요구하는 수법입니다. 대출 상담 기록, 송금 내역, 상대방 정보 등을 정리하여 즉시 신고해야 합니다.'
    },
    {
      id: 'voicephishing-3',
      category: 'voicephishing',
      question: '계좌가 범죄에 이용됐다고 하는데 어떻게 해야 하나요?',
      answer: '계좌가 범죄에 이용된 경우 지급정지 조치를 당할 수 있습니다. 하지만 선의의 피해자라면 이를 해제할 수 있습니다. 관련 증빙을 준비하여 이의제기를 해야 합니다.'
    },

    // 증거/회복
    {
      id: 'evidence-1',
      category: 'evidence',
      question: '카카오톡/문자 메시지도 증거가 되나요?',
      answer: '네, 카카오톡과 문자 메시지는 중요한 증거입니다. 스크린샷과 함께 공증을 받거나, 디지털 포렌식을 통해 증거능력을 확보할 수 있습니다.'
    },
    {
      id: 'evidence-2',
      category: 'evidence',
      question: '상대방이 잠적했는데 찾을 수 있나요?',
      answer: '상대방이 잠적한 경우에도 다양한 방법으로 추적 가능합니다. 계좌 추적, 부동산 조회, 사업자등록 확인 등을 통해 소재를 파악할 수 있습니다.'
    },
    {
      id: 'evidence-3',
      category: 'evidence',
      question: '사기 피해금을 전액 회수할 수 있나요?',
      answer: '피해금 전액 회수는 사기범의 재산 상태에 따라 달라집니다. 하지만 빠른 대응으로 가압류, 가처분 등을 통해 재산을 보전하면 회수 가능성이 높아집니다.'
    },
    {
      id: 'evidence-4',
      category: 'evidence',
      question: '사기범의 재산을 미리 압류할 수 있나요?',
      answer: '네, 가압류를 통해 사기범의 재산을 미리 보전할 수 있습니다. 사기 혐의가 소명되면 법원에서 가압류 결정을 내려 재산 은닉을 방지할 수 있습니다.'
    }
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(faq => faq.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 긴급 상담 버튼 고정 */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link href="/contact" className="bg-red-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-red-600 transition-colors animate-pulse block">
          긴급 상담
        </Link>
      </div>

      {/* Hero Section */}
      <section className="bg-gray-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">사기 피해 FAQ</h1>
          <p className="text-xl mb-8">가장 많이 묻는 질문들을 정리했습니다</p>
          <div className="bg-red-700 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">이런 경우도 사기입니다!</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>• 원금 보장 약속</div>
              <div>• 고수익 보장 투자</div>
              <div>• 선수금 요구 대출</div>
              <div>• 허위 입찰 정보</div>
              <div>• 존재하지 않는 회원권</div>
              <div>• 공공기관 사칭 전화</div>
            </div>
          </div>
        </div>
      </section>

      {/* 카테고리 필터 */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                                 {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ 목록 */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-red-500 font-bold">Q{index + 1}.</span>
                    <span className="font-medium text-gray-900">{faq.question}</span>
                  </div>
                  <span className="text-gray-400 text-xl">
                    {openItems.includes(faq.id) ? '−' : '+'}
                  </span>
                </button>
                
                {openItems.includes(faq.id) && (
                  <div className="px-6 pb-4 border-t border-gray-100">
                    <div className="pt-4 text-gray-700 leading-relaxed">
                      <span className="text-red-500 font-bold">A. </span>
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">사기 피해 해결 실적</h2>
          
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
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gray-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">사기 피해를 당하셨나요?</h2>
          <p className="text-lg mb-8">
            시간이 지날수록 피해 회복이 어려워집니다.<br />
            지금 바로 전문가와 상담하세요.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link href="/contact" className="bg-red-500 text-white px-8 py-3 rounded-lg font-bold text-lg hover:bg-red-600 transition-colors block text-center">
              즉시 상담 (24시간)
            </Link>
            <Link href="/contact" className="bg-white text-slate-700 px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors block text-center">
              카카오톡 상담
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 