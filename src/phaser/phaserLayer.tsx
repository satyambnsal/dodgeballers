"use client";

import { useEffect, useState, useRef } from "react";
import { Game as PhaserGame } from "phaser";
import { LoadScene, MainScene, MenuScene } from "./scenes";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scene: [LoadScene, MenuScene, MainScene],
  backgroundColor: "0xded6b6",
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
    mode: Phaser.Scale.FIT,
  },
};

export default function PhaserLayer() {
  const parentEl = useRef<HTMLDivElement>(null);

  const [_, setGame] = useState<PhaserGame | null>(null);

  useEffect(() => {
    if (!parentEl.current) return;
    const newGame = new PhaserGame({
      ...config,
      parent: parentEl.current,
      width: 1000,
      height: "90%",
    });

    setGame(newGame);

    return () => {
      newGame?.destroy(true, true);
      console.log("🐲 DESTROY 🐲");
    };
  }, []);

  return <div ref={parentEl} className="mt-64 block h-1/2 w-screen" />;
}
