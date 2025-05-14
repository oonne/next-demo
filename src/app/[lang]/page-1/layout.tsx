import type { Metadata } from 'next';

/*
 * SEO TDK
 */
export const metadata: Metadata = {
  title: 'Next Demo Page-1',
  description: '页面1 description',
  keywords: ['页面1'],
};

export default function Page1Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
