'use client';

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import * as Phaser from 'phaser';
import { MainScene } from '../game/scenes/MainScene';
import { EventBus } from '../game/EventBus';

export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

interface PhaserGameProps {
  currentActiveScene?: (scene: Phaser.Scene) => void;
}

const PhaserGameInner = forwardRef<IRefPhaserGame, PhaserGameProps>(({ currentActiveScene }, ref) => {
  const gameRef = useRef<Phaser.Game | null>(null);
  const [score, setScore] = useState(0);
  const [currentScene, setCurrentScene] = useState<Phaser.Scene | null>(null);

  useImperativeHandle(ref, () => ({
    game: gameRef.current,
    scene: currentScene
  }));

  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'phaser-game',
      width: 800,
      height: 400,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false
        }
      },
      scene: MainScene,
      backgroundColor: '#f3f4f6'
    };

    gameRef.current = new Phaser.Game(config);

    EventBus.on('current-scene-ready', (scene: Phaser.Scene) => {
      setCurrentScene(scene);
      currentActiveScene?.(scene);
    });

    EventBus.on('score-updated', (newScore: number) => {
      setScore(newScore);
    });

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [currentActiveScene]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">Score: {score}</div>
      </div>
      <div id="phaser-game" className="rounded-lg overflow-hidden border-2 border-gray-200" />
    </div>
  );
});

PhaserGameInner.displayName = 'PhaserGameInner';
export default PhaserGameInner; 