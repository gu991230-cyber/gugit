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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2">
                <img
                  src="/images/THIS.png"
                  alt="로고"
                  className="w-10 h-10 object-contain"
                  style={{ mixBlendMode: 'multiply' }}
                />
                <span className="text-lg font-bold text-white">박영준 법률사무소</span>
              </Link>
              
              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                                <Link href="/" className="text-white/80 hover:text-white transition-colors font-medium">
                  홈
                </Link>
                <Link href="/#about" className="text-white/80 hover:text-white transition-colors font-medium">
                  소개
                </Link>
                <Link href="/#services" className="text-white/80 hover:text-white transition-colors font-medium">
                  사례
                </Link>
                <Link href="/#contact" className="text-white/80 hover:text-white transition-colors font-medium">
                  오시는 길
                </Link>
                <Link href="/#faq" className="text-white/80 hover:text-white transition-colors font-medium">
                  FAQ
                </Link>
              </div>
              
              {/* Mobile Menu Button */}
              <div className="md:hidden">
                                <button className="text-white/80 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Footer will handle extra bottom spacing; avoid white band above footer */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* Fixed Bottom Consultation Bar */}
        <div className="fixed bottom-6 left-0 right-0 z-[9999] bg-gray-800/95 border border-gray-600 shadow-2xl rounded-lg mx-4 md:mx-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-center py-3 lg:py-4 space-y-3 lg:space-y-0">
              {/* Left Section - Contact Info */}
              <div className="flex items-center space-x-6 text-white">
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-lg font-bold">1:1 빠른 상담 신청하기</span>
                </div>
              </div>
              
              {/* Center Section - Input Fields */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <input
                  type="text"
                  placeholder="이름"
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  placeholder="연락처"
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* Right Section - Agreement & Submit */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="privacy-agreement"
                    className="w-4 h-4 border border-white rounded bg-transparent"
                  />
                  <label htmlFor="privacy-agreement" className="text-white text-sm">
                    개인정보수집동의 <span className="underline cursor-pointer">[취급방침]</span>
                  </label>
                </div>
                <Link 
                  href="/#contact"
                  className="bg-orange-500 text-white px-6 py-2 rounded font-medium hover:bg-orange-600 transition-colors"
                >
                  상담 신청
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <Footer />
      </body>
    </html>
  );
}
