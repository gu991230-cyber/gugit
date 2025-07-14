'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: '홈', href: '/' },
    { name: '법무법인 소개', href: '/about' },
    { name: '사례', href: '/services' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <header className="bg-gray-700/80 backdrop-blur-md shadow fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12">
              <img 
                src="/images/lg.PNG" 
                alt="김정숙 법률사무소 로고" 
                className="w-12 h-12 object-contain rounded-lg shadow-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(234, 90, 43, 0.1) 0%, rgba(251, 146, 60, 0.1) 100%)',
                  padding: '2px'
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">
                Kim Jung Suk Law Firm
              </span>
              <span className="text-xs text-gray-300">
                신뢰받는 법률 서비스
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 ml-auto mr-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-orange-400 font-medium transition-colors py-2 px-1"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="bg-orange-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              무료 상담
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-300 hover:text-orange-400 hover:bg-gray-600 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-600">
            <div className="px-2 pt-4 pb-3 space-y-1 sm:px-3 bg-gray-700">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-3 text-gray-300 hover:text-orange-400 hover:bg-gray-600 font-medium rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="block w-full mt-4 bg-orange-500 text-white px-3 py-3 rounded-lg font-medium text-center hover:bg-orange-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                무료 상담
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 