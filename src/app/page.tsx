import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          src="/img/logo.png"
          alt="logo"
          width={180}
          height={38}
          priority
        />
        <div>
          <h1>首页</h1>
          <Link href="/page-1">跳转到page-1</Link>
        </div>
      </main>
    </div>
  );
}
