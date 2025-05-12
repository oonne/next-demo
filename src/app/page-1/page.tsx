import HeaderNav from '@/components/header-nav/header-nav';
import { Utils } from '@/utils';

const { randomChars } = Utils;

const Page1 = () => {
  const chars = randomChars(10);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <HeaderNav />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          <h1>hello page-1</h1>
          <p>{chars}</p>
        </div>
      </main>
    </div>
  );
};

export default Page1;
