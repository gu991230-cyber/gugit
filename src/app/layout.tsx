import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import ConsultationBar from "@/components/ConsultationBar";
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
                  src="/images/THIS.png?v=2"
                  alt="로고"
                  className="w-10 h-10 object-contain"
                  style={{ filter: 'brightness(0) invert(1)' }}
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
        <ConsultationBar />
        
        <Footer />
      </body>
    </html>
  );
}
