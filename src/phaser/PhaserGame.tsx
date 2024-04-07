import { useLayoutEffect, useRef } from "react";
import StartGame from "./main";

export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

export const PhaserGame = () => {
  const game = useRef<Phaser.Game | null>(null);
  useLayoutEffect(() => {
    game.current = StartGame("game-container");

    return () => {
      if (game.current) {
        game.current.destroy(true);
        if (game.current !== null) {
          game.current = null;
        }
      }
    };
  }, []);

  return <div id="game-container"></div>;
};

export default PhaserGame;
