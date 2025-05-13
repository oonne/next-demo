import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

// 定义支持的语言
const locales = ['en', 'zh', 'es', 'fr', 'ru', 'pt', 'de', 'ja', 'it', 'ko', 'vi'];
const defaultLocale = 'en';

// 获取用户首选语言
function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  const matchedLocale = match(languages, locales, defaultLocale);

  // 将语言代码转换为对应的区域设置代码
  const localeMap: Record<string, string> = {
    en: 'en_US',
    zh: 'zh_CN',
    es: 'es_ES',
    fr: 'fr_FR',
    ru: 'ru_RU',
    pt: 'pt_PT',
    de: 'de_DE',
    ja: 'ja_JP',
    it: 'it_IT',
    ko: 'ko_KR',
    vi: 'vi_VN',
  };

  return localeMap[matchedLocale] || 'en_US';
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 检查路径是否已经包含语言前缀
  const pathnameHasLocale = locales.some(
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
