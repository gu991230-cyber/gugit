# 법무법인 웹사이트 템플릿

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 빠른 시작

이 프로젝트는 법무법인 웹사이트 템플릿입니다. 재사용하기 전에 다음 정보들을 업데이트해주세요:

### 필수 업데이트 항목

1. **개인정보**
   - `[법무법인명]` → 실제 법무법인명
   - `[변호사명]` → 실제 변호사명
   - `[연락처 정보]` → 실제 전화번호
   - `[이메일 정보]` → 실제 이메일
   - `[주소 정보]` → 실제 주소

2. **Firebase 설정**
   - `src/lib/firebase.ts` 파일의 Firebase 설정 정보
   - `[YOUR_API_KEY]`, `[YOUR_PROJECT_ID]` 등

3. **관리자 비밀번호**
   - `src/app/admin/page.tsx`의 `[YOUR_ADMIN_PASSWORD]`

4. **도메인 정보**
   - `src/app/layout.tsx`의 `metadataBase` URL
   - `netlify.toml`의 리다이렉트 설정

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
