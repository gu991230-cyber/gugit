# 법무법인 웹사이트 설정 가이드

## 🔧 Firebase 보안 설정

### 1. 환경 변수 설정 (권장)

현재 Firebase 설정이 코드에 직접 노출되어 있습니다. 보안을 위해 환경 변수로 이동하세요:

1. 프로젝트 루트에 `.env.local` 파일 생성:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBT39szRqhoBJJWyW6xBaseLl4lxAhgy6FE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=lolo5599-1ed73.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=lolo5599-1ed73
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=lolo5599-1ed73.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=701473195654
NEXT_PUBLIC_FIREBASE_APP_ID=1:701473195654:web:01f676913c9d443f2ff307
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-L8NLPC8QN8
```

2. `src/lib/firebase.ts` 파일 수정:
```typescript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};
```

### 2. Firestore 보안 규칙 설정 (중요!)

현재 Firestore 보안 규칙을 확인하고 다음과 같이 설정하세요:

1. Firebase Console → Firestore Database → 규칙 탭 이동
2. 다음 규칙으로 변경:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // consultations 컬렉션 - 상담 신청만 허용
    match /consultations/{document} {
      allow create: if true;  // 누구나 상담 신청 가능
      allow read, update, delete: if false;  // 읽기/수정/삭제 차단
    }
    
    // 다른 모든 문서는 접근 차단
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### 3. 추가 보안 설정

1. **Firebase 프로젝트 설정**:
   - Authentication 탭에서 승인된 도메인만 허용
   - 사용하지 않는 서비스는 비활성화

2. **Firestore 인덱스 설정**:
   - `consultations` 컬렉션에 `createdAt` 필드 인덱스 생성
   - `status` 필드와 `createdAt` 복합 인덱스 생성

## 📋 현재 수정된 오류들

### ✅ 수정 완료
1. **홈페이지 CTA 버튼** - contact 페이지로 연결
2. **Footer 링크** - 없는 페이지 대신 기존 페이지로 연결
3. **에러 처리 개선** - alert 대신 UI 메시지 사용
4. **상태 관리 개선** - 성공/실패 상태 시각적 표시

### ⚠️ 추가 확인 필요
1. **Firestore 보안 규칙** 설정
2. **환경 변수** 이동 (선택사항)
3. **createdAt 필드** 저장 확인

## 🚀 테스트 방법

1. 개발 서버 실행: `npm run dev`
2. http://localhost:3000 접속
3. 상담 신청 폼 테스트
4. Firebase Console에서 데이터 확인

## 📞 기술 지원

문제가 발생하면 다음을 확인하세요:
- 브라우저 개발자 도구 Console 탭
- Firebase Console의 사용량 및 로그
- 네트워크 연결 상태 

### 4. **새로운 UI 메시지 시스템 확인**

#### **성공 메시지 (초록색)**
```
✅ 상담 신청이 접수되었습니다!
   빠른 시일 내에 연락드리겠습니다.
```

#### **에러 메시지 (빨간색)**
```
❌ 오류가 발생했습니다
   [구체적인 오류 내용]
```

### 5. **추가 기능 테스트**

#### **홈페이지 CTA 버튼**
1. `http://localhost:3000` 접속
2. 하단 **"상담 신청하기"** 버튼 클릭
3. Contact 페이지로 정상 이동하는지 확인

#### **Footer 링크**
1. 페이지 하단 Footer 확인
2. **"문의하기"**, **"서비스"**, **"회사소개"** 링크 클릭
3. 404 에러 없이 정상 이동하는지 확인

### 6. **문제 발생 시 확인사항**

만 

## 🚀 **개발 서버 실행 방법**

### 1. **터미널/명령 프롬프트 열기**
- **Windows**: `Windows + R` → `cmd` 또는 `PowerShell` 입력
- **프로젝트 폴더로 이동**: `cd C:\Users\cleo\Desktop\kaka58\law-firm-website`

### 2. **개발 서버 실행**
```bash
npm run dev
```

### 3. **실행 성공 메시지 확인**
다음과 같은 메시지가 나타나면 성공입니다:
```
<code_block_to_apply_changes_from>
```

### 4. **브라우저에서 접속**
- `http://localhost:3000` 접속

## 🔧 **만약 오류가 발생한다면**

### **포트 3000이 사용 중이라는 오류**
```bash
# 다른 포트로 실행
npm run dev -- --port 3001
```
그 후 `http://localhost:3001`로 접속

### **의존성 문제**
```bash
# 의존성 재설치
npm install
```

### **캐시 문제**
```bash
# 캐시 삭제 후 재실행
npm run build
npm run dev
```

## 📱 **개발 서버 실행 후 테스트**

서버가 정상 실행되면:

1. **홈페이지 확인**: `http://localhost:3000`
2. **연락처 페이지 이동**: `http://localhost:3000/contact`
3. **상담 신청 테스트**: 폼 작성 후 제출
4. **Firebase Console 확인**: 새로운 8개 필드 데이터 확인

## 🆘 **그래도 안 된다면**

다음을 확인해보세요:

1. **Node.js 설치 확인**: `node --version`
2. **npm 설치 확인**: `npm --version`
3. **프로젝트 폴더 위치**: `law-firm-website` 폴더 안에 있는지 확인
4. **방화벽/백신 프로그램**: 3000 포트 차단 여부 확인

**개발 서버를 실행하신 후 다시 테스트해보세요!** 🎯 

## 🔧 **문제 해결**

현재 위치: `C:\Users\cleo\Desktop\kaka58\` (❌ 잘못된 위치)
올바른 위치: `C:\Users\cleo\Desktop\kaka58\law-firm-website\` (✅ 올바른 위치)

### **올바른 실행 방법**

1. **프로젝트 폴더로 이동**:
```bash
cd law-firm-website
```

2. **그 다음 개발 서버 실행**:
```bash
npm run dev
```

### **또는 한 번에 실행**:
```bash
cd C:\Users\cleo\Desktop\kaka58\law-firm-website
npm run dev
```

## 📁 **폴더 구조 확인**

```
<code_block_to_apply_changes_from>
```

## 🚀 **정확한 단계**

1. **터미널에서 현재 위치 확인**:
```bash
pwd
# 또는
dir
```

2. **law-firm-website 폴더로 이동**:
```bash
cd law-firm-website
```

3. **package.json이 있는지 확인**:
```bash
dir package.json
# 또는
ls package.json
```

4. **개발 서버 실행**:
```bash
npm run dev
```

이제 다시 시도해보세요! `law-firm-website` 폴더 안에서 `npm run dev`를 실행하면 정상적으로 작동할 것입니다. 🎯

## 🎨 **Tailwind CSS 설정 수정 완료**

### **문제점**
- 기존에 **Tailwind CSS v4** (알파/베타 버전)를 사용하고 있었음
- Next.js 15.3.5와 호환성 문제 가능성
- 불안정한 설정으로 스타일이 제대로 적용되지 않을 수 있음

### **해결 방안**
✅ **Tailwind CSS v3.4.4** (안정 버전)로 다운그레이드 완료

#### **변경된 파일들:**
1. **tailwind.config.js** (새로 생성)
2. **src/app/globals.css** - v3 방식으로 수정
3. **postcss.config.mjs** - 전통적인 설정으로 변경  
4. **package.json** - 의존성 버전 수정

### **새로운 설정 후 실행 순서:**
1. **의존성 재설치**: `npm install`
2. **개발 서버 실행**: `npm run dev`
3. **브라우저 확인**: `http://localhost:3000`

### **Tailwind CSS 정상 작동 확인:**
- 페이지 스타일링이 제대로 적용되는지 확인
- 반응형 디자인이 작동하는지 확인
- 색상, 폰트, 애니메이션이 정상적으로 표시되는지 확인

## 🎬 **Hero 섹션 비디오 배경 설정**

### **비디오 파일 추가**
새로운 Hero 섹션에 비디오 배경을 추가하려면:

1. **비디오 파일 준비**:
   - 파일명: `hero-bg.mp4`
   - 위치: `public/videos/hero-bg.mp4`
   - 권장 해상도: 1920x1080 (Full HD)
   - 권장 길이: 10-30초
   - 파일 크기: 10MB 이하

2. **이미지 파일 준비** (모바일 fallback):
   - 파일명: `hero-bg.jpg`
   - 위치: `public/images/hero-bg.jpg`
   - 권장 해상도: 1920x1080 이상
   - 파일 크기: 500KB 이하

### **무료 미디어 소스**
- **Pexels**: https://www.pexels.com/videos/
- **Pixabay**: https://pixabay.com/videos/
- **Unsplash**: https://unsplash.com/

### **검색 키워드**
- "corporate buildings"
- "city skyline"
- "business district"
- "modern architecture"
- "office buildings"

### **현재 상태**
비디오/이미지 파일이 없어도 **그라데이션 배경**으로 정상 작동합니다.
미디어 파일을 추가하면 더욱 임팩트 있는 Hero 섹션을 만들 수 있습니다! 