'use client';

import { useEffect, useState, useCallback } from 'react';

export default function JumpingBox() {
  const [position, setPosition] = useState(300); // Initial y position
  const [velocity, setVelocity] = useState(0);
  const gravity = 0.1;
  const jumpForce = -8;
  const groundLevel = 300;

  const updatePhysics = useCallback(() => {
    setPosition((prevPosition) => {
      let newPosition = prevPosition + velocity;

      // Check if box has hit the ground
      if (newPosition > groundLevel) {
        newPosition = groundLevel;
        setVelocity(0);
      } else {
        setVelocity((prevVelocity) => prevVelocity + gravity);
      }

      return newPosition;
    });
  }, [velocity]);

  const handleJump = useCallback(() => {
    if (position >= groundLevel) {
      setVelocity(jumpForce);
    }
  }, [position]);

  useEffect(() => {
    let animationFrameId: number;

    const gameLoop = () => {
      updatePhysics();
      animationFrameId = requestAnimationFrame(gameLoop);
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        handleJump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    animationFrameId = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      cancelAnimationFrame(animationFrameId);
    };
  }, [updatePhysics, handleJump]);

  return (
    <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
      <div
        className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-500 rounded-md transition-transform"
        style={{
          top: `${position}px`,
        }}
      />
      <div className="absolute bottom-0 w-full h-2 bg-gray-300" />
      <div className="absolute top-4 left-4 text-sm text-gray-600">
        Press spacebar to jump
      </div>
    </div>
  );
} 