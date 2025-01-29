'use client';

import dynamic from 'next/dynamic';

const PhaserGameInner = dynamic(() => import('./PhaserGameInner'), {
  ssr: false,
  loading: () => <div>Loading game...</div>
});

export default function GameWrapper() {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Phaser.js Game</h2>
      <PhaserGameInner />
    </div>
  );
} 