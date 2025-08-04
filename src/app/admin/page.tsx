'use client';

import { useState } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Search, Eye, Calendar, Phone, User } from 'lucide-react';

interface ConsultationData {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  createdAt: Date | null;
  submittedAt: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [consultations, setConsultations] = useState<ConsultationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationData | null>(null);

  // 비밀번호 확인 (실제 서비스에서는 더 안전한 방법 사용)
  const ADMIN_PASSWORD = 'cldcodchd6'; // 실제로는 환경변수나 더 안전한 방법 사용

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
      fetchConsultations();
    } else {
      setLoginError('비밀번호가 올바르지 않습니다.');
    }
  };

  const fetchConsultations = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'consultations'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const consultationsList: ConsultationData[] = [];
      
      querySnapshot.forEach((doc) => {
        consultationsList.push({
          id: doc.id,
          ...doc.data()
        } as ConsultationData);
      });
      
      setConsultations(consultationsList);
    } catch (error) {
      console.error('상담 데이터 가져오기 오류:', error);
    } finally {
      setLoading(false);
    }
  };

  // 검색 필터링
  const filteredConsultations = consultations.filter(consultation => 
    consultation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    consultation.phone.includes(searchTerm)
  );

  // 정렬
  const sortedConsultations = [...filteredConsultations].sort((a, b) => {
    const dateA = new Date(a.submittedAt).getTime();
    const dateB = new Date(b.submittedAt).getTime();
    
    if (sortOrder === 'newest') {
      return dateB - dateA;
    } else {
      return dateA - dateB;
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR');
  };

  // 로그인 화면
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">어드민 로그인</h1>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="관리자 비밀번호를 입력하세요"
                required
              />
            </div>
            
            {loginError && (
              <div className="text-red-600 text-sm">{loginError}</div>
            )}
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 상세 정보 모달
  if (selectedConsultation) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">상담 신청 상세 정보</h2>
                <button
                  onClick={() => setSelectedConsultation(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  목록으로
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">이름</label>
                  <p className="mt-1 text-lg font-semibold">{selectedConsultation.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">전화번호</label>
                  <p className="mt-1 text-lg font-semibold">{selectedConsultation.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">이메일</label>
                  <p className="mt-1 text-lg">{selectedConsultation.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">상담 분야</label>
                  <p className="mt-1 text-lg">{selectedConsultation.service}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">신청 날짜</label>
                <p className="mt-1 text-lg">{formatDate(selectedConsultation.submittedAt)}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">상담 내용</label>
                <div className="mt-1 p-4 bg-gray-50 rounded-md">
                  <p className="whitespace-pre-wrap">{selectedConsultation.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 메인 어드민 화면
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">상담 신청 관리</h1>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 검색 및 정렬 */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="이름 또는 전화번호로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">정렬:</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">최신순</option>
                <option value="oldest">오래된순</option>
              </select>
            </div>
          </div>
        </div>

        {/* 통계 정보 */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              전체 상담 신청: <span className="font-semibold text-blue-600">{consultations.length}건</span>
            </div>
            <div className="text-sm text-gray-600">
              검색 결과: <span className="font-semibold text-green-600">{sortedConsultations.length}건</span>
            </div>
          </div>
        </div>

        {/* 상담 신청 목록 */}
        <div className="bg-white rounded-lg shadow-sm">
          {loading ? (
            <div className="p-8 text-center">
              <div className="text-gray-500">데이터를 불러오는 중...</div>
            </div>
          ) : sortedConsultations.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-500">
                {searchTerm ? '검색 결과가 없습니다.' : '상담 신청이 없습니다.'}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      이름
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      전화번호
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상담 분야
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      신청 날짜
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상세 보기
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedConsultations.map((consultation) => (
                    <tr key={consultation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="font-medium">{consultation.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          <span>{consultation.phone}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {consultation.service}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-500">
                            {formatDate(consultation.submittedAt)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => setSelectedConsultation(consultation)}
                          className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 text-sm"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          상세 보기
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 