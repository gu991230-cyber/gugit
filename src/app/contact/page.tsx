'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // 저장할 데이터 구조 확인
      const dataToSave = {
        ...formData,
        createdAt: Timestamp.now(),
        submittedAt: new Date().toISOString(),
        status: 'pending' // 대기, 처리중, 완료 등의 상태 관리
      };
      
      console.log('저장할 데이터:', dataToSave);
      
      // Firestore에 문의 데이터 저장
              const docRef = await addDoc(collection(db, 'consultations'), dataToSave);
      
      console.log('문서가 저장되었습니다. ID:', docRef.id);
      setSubmitStatus('success');
      
      // 폼 초기화
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });

      // 3초 후 성공 메시지 숨기기
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
      
    } catch (error) {
      console.error('Error adding document: ', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : '문의 접수 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: '전화번호',
               info: '010-1111-2222',
      description: '평일 09:00 - 18:00'
    },
    {
      icon: Mail,
      title: '이메일',
      info: 'jungsuk75@gmail.com',
      description: '24시간 접수 가능'
    },
    {
      icon: MapPin,
      title: '사무실 주소',
      info: '서울특별시 강남구 테헤란로 317 동훈빌딩 503호',
      description: '지하철 2호선 선릉역 5번 출구'
    },
    {
      icon: Clock,
      title: '운영시간',
      info: '평일 09:00 - 18:00',
      description: '토요일 09:00 - 13:00'
    }
  ];

  const services = [
    '민사소송',
    '입찰권 분쟁',
    '투자사기',
    '보이스피싱',
    '로맨스스캠',
    '기타'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              연락처
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              전문 변호사와의 상담을 통해 최적의 해결책을 찾아보세요
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((item, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md border">
                <item.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-blue-600 font-medium mb-1">
                  {item.info}
                </p>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                무료 상담 신청
              </h2>
              
              {/* 상태 메시지 */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-green-800 font-semibold">상담 신청이 접수되었습니다!</h3>
                    <p className="text-green-700 text-sm">빠른 시일 내에 연락드리겠습니다.</p>
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                  <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-red-800 font-semibold">오류가 발생했습니다</h3>
                    <p className="text-red-700 text-sm">{errorMessage}</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      성명 *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="성명을 입력하세요"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      전화번호 *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="010-1234-5678"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    이메일 *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                    상담 분야 *
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">상담 분야를 선택하세요</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    상담 내용 *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="상담받고 싶은 내용을 자세히 적어주세요"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <Send className="mr-2 h-5 w-5" />
                  {isSubmitting ? '접수 중...' : '상담 신청하기'}
                </button>
              </form>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  * 개인정보는 상담 목적으로만 사용되며, 상담 완료 후 안전하게 폐기됩니다.<br />
                  * 상담 신청 후 24시간 이내에 연락드립니다.
                </p>
              </div>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-8">
              {/* Google Maps */}
              <div className="rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.5441!2d127.0394!3d37.5013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca15b06f1e5b1%3A0x87c8b0b26e1ea2a5!2z7ISc7Jq47Yq567OE7IucIOqwleuCqOq1rCDthYztl6TrnoDroZwgMzE3!5e0!3m2!1sko!2skr!4v1641234567890!5m2!1sko!2skr"
                  width="100%"
                  height="320"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="김정숙 법률사무소 위치"
                />
                <div className="bg-white p-4 border-t">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium">서울특별시 강남구 테헤란로 317 동훈빌딩 503호</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 ml-7">지하철 2호선 선릉역 5번 출구 도보 3분</p>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-red-800 mb-4">
                  긴급 상담
                </h3>
                <p className="text-red-700 mb-4">
                  긴급한 법률 문제가 있으시면 즉시 연락주세요.
                </p>
                <div className="space-y-2">
                  <p className="font-medium text-red-800">
                    24시간 긴급 연락처: [연락처 정보]
                  </p>
                  <p className="text-sm text-red-600">
                    * 긴급상황에만 사용해 주세요
                  </p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">
                  운영 시간
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-700">평일</span>
                    <span className="text-blue-800 font-medium">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">토요일</span>
                    <span className="text-blue-800 font-medium">09:00 - 13:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">일요일/공휴일</span>
                    <span className="text-blue-800 font-medium">휴무</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 