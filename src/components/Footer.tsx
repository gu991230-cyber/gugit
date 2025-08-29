import Link from 'next/link';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gray-800 text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/115.png')` }}
        />
        <div className="absolute inset-0 bg-gray-900/80" />
      </div>
      
      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-500 rounded-lg">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-white">J</span>
                  <span className="text-sm font-bold text-white ml-0.5">S</span>
                </div>
              </div>
              <div>
                 <span className="text-2xl font-bold text-white">
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
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500 mb-1">12</div>
                <p className="text-xs text-gray-400">년의 경험</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500 mb-1">900+</div>
                <p className="text-xs text-gray-400">성공 사례</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500 mb-1">91%</div>
                <p className="text-xs text-gray-400">승소율</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                                  <Phone className="h-4 w-4 text-orange-500" />
                 <span className="text-gray-300">010-1111-2222</span>
              </div>
              <div className="flex items-center space-x-3">
                                  <Mail className="h-4 w-4 text-orange-500" />
                 <span className="text-gray-300">contact@parkyoungjunlawfirm.com</span>
              </div>
              <div className="flex items-center space-x-3">
                                  <MapPin className="h-4 w-4 text-orange-500" />
                 <span className="text-gray-300">[주소 정보]</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-orange-500">빠른 링크</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-orange-500 transition-colors">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-orange-500 transition-colors">
                  법무법인 소개
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-orange-500 transition-colors">
                  사례
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-orange-500 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Office Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-orange-500">전문 분야</h3>
            <ul className="space-y-3 mb-8">
              <li className="text-gray-300 text-sm">• 입찰권 분야</li>
              <li className="text-gray-300 text-sm">• 회원권 분야</li>
              <li className="text-gray-300 text-sm">• 투자사기 분야</li>
              <li className="text-gray-300 text-sm">• 보이스피싱 범죄</li>
            </ul>

            <h4 className="text-orange-500 font-semibold mb-4 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              운영 시간
            </h4>
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
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
               <p>&copy; 2025 박영준 법률사무소. All rights reserved.</p>
               <p className="mt-1">대표변호사: 박영준</p>
            </div>
            <div className="flex space-x-8 text-sm">
              <Link href="/faq" className="text-gray-400 hover:text-orange-500 transition-colors text-center min-w-[60px]">
                FAQ
              </Link>
              <Link href="/services" className="text-gray-400 hover:text-orange-500 transition-colors text-center min-w-[60px]">
                사례
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-orange-500 transition-colors text-center min-w-[60px]">
                회사소개
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 