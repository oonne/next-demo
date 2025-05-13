import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 获取当前请求的路径
  const path = request.nextUrl.pathname;

  // 如果路径不存在（404），重定向到首页
  if (path === '/404') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// 配置需要匹配的路径
export const config = {
  matcher: ['/404'],
};
