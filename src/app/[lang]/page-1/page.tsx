import HeaderNav from '@/components/header-nav/header-nav';
import RandomChars from '@/components/random-chars/ramdom-chars';
import Counter from '@/components/counter/counter';
import { getDictionary } from '@/i18n';

export const runtime = 'edge';

const Page1 = async ({ params }: { params: { lang: string } }) => {
  const { lang } = await params;
  const dict = await getDictionary(lang as LangCode);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <HeaderNav />

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          <h1>页面1</h1>
          <h2>{dict.link_home}</h2>
        </div>

        <div>
          <RandomChars />
        </div>

        <div>
          <Counter />
        </div>
      </main>
    </div>
  );
};

export default Page1;
