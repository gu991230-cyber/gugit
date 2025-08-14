import React from 'react';

interface AdBannerProps {
  targetUrl?: string;
  type?: 'click' | 'static';
}

const AdBanner: React.FC<AdBannerProps> = ({ 
   targetUrl = "https://parkyoungjunlawfirm.com", 
  type = 'click' 
}) => {
  const bannerContent = (
    <div className="relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 cursor-pointer">
      {/* Background with Justice Scale */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-700 to-gray-800">
        {/* Justice Scale SVG Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          <svg 
            width="500" 
            height="500" 
            viewBox="0 0 400 400" 
            className="filter blur-xs"
            fill="currentColor"
          >
            {/* Scale Base */}
            <rect x="195" y="320" width="10" height="60" fill="#f97316" />
            <rect x="170" y="375" width="60" height="8" fill="#f97316" />
            
            {/* Scale Pole */}
            <rect x="198" y="80" width="4" height="240" fill="#f97316" />
            
            {/* Scale Arm */}
            <rect x="120" y="98" width="160" height="4" fill="#f97316" />
            
            {/* Left Scale Pan */}
            <ellipse cx="140" cy="120" rx="35" ry="8" fill="#f97316" opacity="0.8" />
            <path d="M 105 120 Q 140 135 175 120" stroke="#f97316" strokeWidth="2" fill="none" />
            <line x1="140" y1="102" x2="140" y2="120" stroke="#f97316" strokeWidth="2" />
            
            {/* Right Scale Pan */}
            <ellipse cx="260" cy="120" rx="35" ry="8" fill="#f97316" opacity="0.8" />
            <path d="M 225 120 Q 260 135 295 120" stroke="#f97316" strokeWidth="2" fill="none" />
            <line x1="260" y1="102" x2="260" y2="120" stroke="#f97316" strokeWidth="2" />
            
            {/* Decorative Elements */}
            <circle cx="200" cy="80" r="8" fill="#f97316" />
            <path d="M 190 60 Q 200 50 210 60" stroke="#f97316" strokeWidth="3" fill="none" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 p-8 text-center">
        {/* Header */}
        <div className="mb-4">
          <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-3">
            투자사기 방지센터
          </div>
          <h1 className="text-white text-2xl lg:text-3xl font-bold leading-tight mb-2">
            법률사무소 해성 온라인 사기
          </h1>
          <h2 className="text-cyan-400 text-3xl lg:text-4xl font-bold mb-4">
            피해자 상담안내
          </h2>
        </div>

        {/* Description */}
        <div className="text-white space-y-2 mb-6 text-base lg:text-lg">
          <p>사기 수법은 조금씩 다를 수 있습니다.</p>
          <p>다만, 큰 틀은 비슷하기 때문에 관련 전화를 받아</p>
          <p>이미 입금을 하셨다면</p>
          <p className="font-bold">지금 문의하셔서 확인해 보시기 바랍니다.</p>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <div className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold text-lg flex items-center gap-2 hover:bg-orange-600 transition-colors">
            <span className="bg-white text-orange-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
              💬
            </span>
            무료 상담 문의하기
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 text-gray-300 text-sm">
          <p>[법무법인명] | 12년 경험 | 91% 승소율</p>
          <p>전문 분야: 투자사기·폰지사기·전화사기·입찰권·회원권</p>
        </div>
              </div>
      </div>
  );

  if (type === 'static') {
    return bannerContent;
  }

  return (
    <a 
      href={targetUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block no-underline"
    >
      {bannerContent}
    </a>
  );
};

export default AdBanner; 