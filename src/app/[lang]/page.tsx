import { getDictionary } from '@/i18n';

export default async function Home({ params: { lang } }: { params: { lang: string } }) {
  const dict = await getDictionary(lang as 'en' | 'zh');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>{dict.common.welcome}</h1>
      <nav>
        <ul>
          <li>{dict.navigation.home}</li>
          <li>{dict.navigation.about}</li>
        </ul>
      </nav>
    </main>
  );
}
