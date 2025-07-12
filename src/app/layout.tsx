import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "김정숙 법률사무소 - 신뢰받는 법률 서비스",
  description: "12년의 경험으로 축적된 전문성과 신뢰성. 입찰권, 회원권, 투자사기, 폰지사기, 전화사기 분야에 특화된 전문 변호사와 상담하세요.",
  keywords: "법무법인, 변호사, 법률상담, 투자사기, 폰지사기, 전화사기, 입찰권, 회원권, 사기피해",
  authors: [{ name: "김정숙 법률사무소" }],
  openGraph: {
    title: "김정숙 법률사무소 - 신뢰받는 법률 서비스",
    description: "12년의 경험으로 축적된 전문성과 신뢰성",
    type: "website",
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
        <Header />
        <main className="pt-20 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
