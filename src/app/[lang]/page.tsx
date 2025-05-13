import { getDictionary } from '@/i18n';

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang as 'en' | 'zh');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <nav>
        <ul>
          <li>{dict.link_home}</li>
          <li>{dict.link_friend}</li>
        </ul>
      </nav>
    </main>
  );
}
