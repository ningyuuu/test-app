'use client';

import dynamic from 'next/dynamic';

const PhaserGameInner = dynamic(() => import('./PhaserGameInner'), {
  ssr: false,
  loading: () => <div>Loading game...</div>
});

export default function GameWrapper() {
  return (
    <div className="w-full">
      <PhaserGameInner />
    </div>
  );
} 