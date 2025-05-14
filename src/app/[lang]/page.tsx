import Link from 'next/link';
import Image from 'next/image';
import { getDictionary } from '@/i18n';

const Home = async ({ params }: { params: Promise<{ lang: string }> }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang as LangCode);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <nav>
        <ul>
          <li>{dict.link_home}</li>
          <li>{dict.link_friend}</li>
          <li>本地环境变量: {process.env.NEXT_PUBLIC_ENV_NAME}</li>
        </ul>
      </nav>

      <Image src="/img/logo.png" alt="logo" width={180} height={180} priority />

      <Link href={`/${lang}/page-1`}>跳转到页面1</Link>
    </main>
  );
};

export default Home;
