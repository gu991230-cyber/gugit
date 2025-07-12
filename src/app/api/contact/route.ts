import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 폼 데이터 파싱
    const formData = await request.formData();
    
    const contactData = {
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      inquiry: formData.get('inquiry') as string,
      privacy: formData.get('privacy') as string,
      timestamp: new Date().toISOString(),
    };

    // 데이터 검증
    if (!contactData.name || !contactData.phone || !contactData.inquiry || !contactData.privacy) {
      return new Response('필수 정보를 모두 입력해주세요.', { status: 400 });
    }

    // 여기서 실제로는 데이터베이스에 저장하거나 이메일을 보내는 로직을 추가할 수 있습니다
    console.log('상담 신청 데이터:', contactData);

    // 간단한 성공 응답
    return new Response('상담 신청이 접수되었습니다. 24시간 내에 연락드리겠습니다.', { 
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8'
      }
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response('서버 오류가 발생했습니다.', { status: 500 });
  }
} 