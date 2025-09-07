'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Search, Eye, Calendar, Phone, User, Users, TrendingUp, Clock } from 'lucide-react';

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

interface VisitorData {
  id: string;
  ip: string;
  userAgent: string;
  visitTime: Date;
  page: string;
  timestamp: Date;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [consultations, setConsultations] = useState<ConsultationData[]>([]);
  const [visitors, setVisitors] = useState<VisitorData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationData | null>(null);
  const [activeTab, setActiveTab] = useState<'consultations' | 'visitors'>('consultations');

  // 비밀번호 확인 (실제 서비스에서는 더 안전한 방법 사용)
  const ADMIN_PASSWORD = 'cldcodchd5'; // 실제로는 환경변수나 더 안전한 방법 사용

  // 컴포넌트 마운트 시 로그인 상태 확인
  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAuthenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
      fetchConsultations();
      fetchVisitors();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      setLoginError('');
      fetchConsultations();
      fetchVisitors();
    } else {
      setLoginError('비밀번호가 올바르지 않습니다.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
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

  const fetchVisitors = async () => {
    try {
      const q = query(
        collection(db, 'visitors'),
        orderBy('timestamp', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const visitorsList: VisitorData[] = [];
      
      querySnapshot.forEach((doc) => {
        visitorsList.push({
          id: doc.id,
          ...doc.data()
        } as VisitorData);
      });
      
      setVisitors(visitorsList);
    } catch (error) {
      console.error('방문자 데이터 가져오기 오류:', error);
    }
  };

  // 오늘 방문자 수 계산
  const getTodayVisitors = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return visitors.filter(visitor => {
      const visitDate = new Date(visitor.timestamp);
      return visitDate >= today;
    }).length;
  };

  // 고유 IP 방문자 수 계산
  const getUniqueVisitors = () => {
    const uniqueIPs = new Set(visitors.map(visitor => visitor.ip));
    return uniqueIPs.size;
  };

  // 오늘 고유 IP 방문자 수 계산
  const getTodayUniqueVisitors = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todayVisitors = visitors.filter(visitor => {
      const visitDate = new Date(visitor.timestamp);
      return visitDate >= today;
    });
    
    const uniqueIPs = new Set(todayVisitors.map(visitor => visitor.ip));
    return uniqueIPs.size;
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
            <h1 className="text-2xl font-bold">관리자 대시보드</h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 탭 네비게이션 */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('consultations')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'consultations'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                상담 신청 관리
              </button>
              <button
                onClick={() => setActiveTab('visitors')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'visitors'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                방문자 통계
              </button>
            </nav>
          </div>
        </div>

        {/* 방문자 통계 탭 */}
        {activeTab === 'visitors' && (
          <div className="space-y-6">
            {/* 통계 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">오늘 방문자</p>
                    <p className="text-2xl font-bold text-gray-900">{getTodayVisitors()}명</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">오늘 고유 방문자</p>
                    <p className="text-2xl font-bold text-gray-900">{getTodayUniqueVisitors()}명</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">전체 고유 방문자</p>
                    <p className="text-2xl font-bold text-gray-900">{getUniqueVisitors()}명</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">전체 방문</p>
                    <p className="text-2xl font-bold text-gray-900">{visitors.length}회</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 방문자 목록 */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">최근 방문자 목록</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        IP 주소
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        방문 시간
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        페이지
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        브라우저
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {visitors.slice(0, 20).map((visitor) => (
                      <tr key={visitor.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="font-mono text-sm">{visitor.ip}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-500">
                            {new Date(visitor.timestamp).toLocaleString('ko-KR')}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {visitor.page}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-500 truncate max-w-xs block">
                            {visitor.userAgent}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 상담 신청 관리 탭 */}
        {activeTab === 'consultations' && (
          <div className="space-y-6">
            {/* 검색 및 정렬 */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
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
            <div className="bg-white p-4 rounded-lg shadow-sm">
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
        )}
      </div>
    </div>
  );
} 