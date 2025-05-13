import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, LANG_LOCALE_MAP } from '@/i18n/config';

// 获取用户首选语言
function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const matchedLocale = match(languages, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE);

  return LANG_LOCALE_MAP[matchedLocale as LangCode] || LANG_LOCALE_MAP[DEFAULT_LANGUAGE];
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 检查路径是否已经包含语言前缀
  const pathnameHasLocale = SUPPORTED_LANGUAGES.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // 重定向到带语言前缀的路径
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // 跳过所有内部路径 (_next)
    '/((?!_next|api|_vercel|.*\\..*).*)',
  ],
};
