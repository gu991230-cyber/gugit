import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Link from "next/link";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "박영준 법률사무소 - 신뢰받는 법률 서비스",
  description: "12년의 경험으로 축적된 전문성과 신뢰성. 입찰권, 회원권, 투자사기, 폰지사기, 전화사기 분야에 특화된 전문 변호사와 상담하세요.",
  keywords: "법무법인, 변호사, 법률상담, 투자사기, 폰지사기, 전화사기, 입찰권, 회원권, 사기피해",
  authors: [{ name: "박영준 법률사무소" }],
  metadataBase: new URL('https://parkyoungjunlawfirm.com'),
  openGraph: {
    title: "박영준 법률사무소 - 신뢰받는 법률 서비스",
    description: "12년의 경험으로 축적된 전문성과 신뢰성",
    type: "website",
    url: 'https://parkyoungjunlawfirm.com',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Simple Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
                             <Link href="/" className="flex items-center space-x-2">
                                  <img 
                    src="/images/pyj.png" 
                    alt="박영준 법률사무소 로고" 
                    className="w-8 h-8 object-contain"
                    style={{ 
                      filter: 'brightness(0) invert(1)',
                      mixBlendMode: 'normal'
                    }}
                  />
                 <span className="text-lg font-bold text-white">박영준 법률사무소</span>
               </Link>
              
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                                 <Link href="/" className="text-white hover:text-orange-400 transition-colors font-medium">
                   홈
                 </Link>
                 <Link href="/#about" className="text-white hover:text-orange-400 transition-colors font-medium">
                   소개
                 </Link>
                 <Link href="/services" className="text-white hover:text-orange-400 transition-colors font-medium">
                   서비스
                 </Link>
                 <Link href="/contact" className="text-white hover:text-orange-400 transition-colors font-medium">
                   연락처
                 </Link>
                 <Link href="/faq" className="text-white hover:text-orange-400 transition-colors font-medium">
                   FAQ
                 </Link>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                                 <button className="text-white hover:text-orange-400 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Fixed Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center py-3 sm:py-0 sm:h-16 space-y-2 sm:space-y-0">
              {/* Quick Contact Info */}
              <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="font-medium text-gray-700">010-1111-2222</span>
                </div>
                <div className="hidden sm:flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">24시간 상담 가능</span>
                </div>
              </div>
              
              {/* Quick Consultation Button */}
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
                className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold text-xs sm:text-sm hover:bg-blue-700 transition-colors shadow-lg"
              >
                1:1 빠른 상담하기
              </button>
            </div>
          </div>
        </div>
        
        <Footer />
      </body>
    </html>
  );
}
