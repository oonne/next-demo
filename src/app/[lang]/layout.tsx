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

const RootLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) => {
  return (
    <html lang={params.lang}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
};

export default RootLayout;
