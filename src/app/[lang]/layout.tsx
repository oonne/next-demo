import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/style/globals.css';

/*
 * 字体
 */
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

/*
 * SEO TDK
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Next Demo',
    description: 'Next 示例项目 description',
    keywords: ['Next'],
    alternates: {
      canonical: process.env.NEXT_PUBLIC_DOMIAN,
    },
  };
}

/*
 * 运行时 必须设置为edge，以支持国际化和服务端渲染
 */
export const runtime = 'edge';

/*
 * 基础布局
 */
const RootLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) => {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
};

export default RootLayout;
