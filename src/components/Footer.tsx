import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gray-800 text-white pb-8">
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/1445.PNG')` }}
        />
        <div className="absolute inset-0 bg-gray-900/95" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 xl:gap-16 items-start justify-items-start">
            <div className="w-full">
              <div className="flex items-center space-x-3 mb-6">
                <img 
                  src="/images/THIS.png?v=2" 
                  alt="로고" 
                  className="w-12 h-12 object-contain" 
                  style={{ filter: 'brightness(0) invert(1)' }} 
                />
                <div className="flex-1 min-w-0">
                  <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white whitespace-nowrap">
                    박영준 법률사무소
                  </span>
                  <p className="text-xs text-gray-400">
                    신뢰받는 법률 서비스
                  </p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-lg">
                12년의 경험과 전문성을 바탕으로 최고 수준의 법률 서비스를 제공하는 
                전문 법률사무소입니다. 고객의 권익 보호를 위해 
                최선을 다하겠습니다.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-orange-500" />
                  <span className="text-gray-300">YJPLAW515@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-orange-500" />
                  <span className="text-gray-300">대한민국 서울특별시 송파구 가락동 중대로 200 태화빌딩 2층 201호</span>
                </div>
              </div>
            </div>

            <div className="w-full">
              <h3 className="text-lg font-semibold mb-6 text-orange-500">빠른 링크</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-orange-500 transition-colors">
                    홈
                  </Link>
                </li>
                <li>
                  <Link href="/#about" className="text-gray-300 hover:text-orange-500 transition-colors">
                    소개
                  </Link>
                </li>
                <li>
                  <Link href="/#services" className="text-gray-300 hover:text-orange-500 transition-colors">
                    사례
                  </Link>
                </li>
                <li>
                  <Link href="/#faq" className="text-gray-300 hover:text-orange-500 transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full">
              <h3 className="text-lg font-semibold mb-6 text-orange-500">전문 분야</h3>
              <ul className="space-y-3">
                <li className="text-gray-300 text-sm">• 입찰권 분야</li>
                <li className="text-gray-300 text-sm">• 회원권 분야</li>
                <li className="text-gray-300 text-sm">• 투자사기 분야</li>
                <li className="text-gray-300 text-sm">• 보이스피싱 범죄</li>
              </ul>
            </div>

            <div className="w-full">
              <h3 className="text-lg font-semibold mb-6 text-orange-500 flex items-center">
                <Clock className="h-4 w-4" />
                <span className="ml-2">운영 시간</span>
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">평일</span>
                  <span className="text-gray-300">09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">토요일</span>
                  <span className="text-gray-300">09:00 - 13:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">일요일/공휴일</span>
                  <span className="text-gray-300">휴무</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <div className="text-white text-right">
              <div className="text-2xl md:text-3xl leading-relaxed">
                기다리면 해결될까요? 아닙니다.<br />
                문제는 지금 대응할 때 풀립니다.<br />
                전문가의 차이가 결과의 차이입니다.<br />
                고민하지 마시고 지금 상담신청 남겨주세요.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              <p>&copy; 2025 박영준 법률사무소. All rights reserved.</p>
              <p className="mt-1">대표변호사: 박영준</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
