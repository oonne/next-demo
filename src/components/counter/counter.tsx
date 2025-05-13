'use client';

import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center">
      <div>计数器</div>
      <div className="flex items-center gap-10">
        <button onClick={() => setCount(count + 1)} className="font-bold text-2xl">
          +
        </button>
        <button onClick={() => setCount(count - 1)} className="font-bold text-2xl">
          -
        </button>
      </div>
      <div>{count}</div>
    </div>
  );
};

export default Counter;
