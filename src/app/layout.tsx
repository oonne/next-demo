import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next Demo',
  description: 'Next 示例项目',
};

export const runtime = 'edge';

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
