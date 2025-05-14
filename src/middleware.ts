import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '@/i18n/config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 检查路径是否已经包含语言前缀，如果包含，不需要重定向
  const pathnameHasLocale = SUPPORTED_LANGUAGES.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    return;
  }

  // 如果路径没有包含语言前缀，则默认为英文
  const url = request.nextUrl.clone();
  // 首页保留原路径
  if (pathname === '/') {
    url.pathname = `/${DEFAULT_LANGUAGE}`;
    return NextResponse.rewrite(url);
  }
  // 子页面重定向
  url.pathname = `/${DEFAULT_LANGUAGE}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // 跳过所有内部路径 (_next)
    '/((?!_next|api|_vercel|.*\\..*).*)',
  ],
};
