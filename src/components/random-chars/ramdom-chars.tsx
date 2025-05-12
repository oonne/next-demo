import { Utils } from '@/utils';

const { randomChars } = Utils;

// 强制动态渲染
export const dynamic = 'force-dynamic';

const RandomChars = async () => {
  const chars = randomChars(10);

  return <div>{chars}</div>;
};

export default RandomChars;
