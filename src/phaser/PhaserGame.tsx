import { useLayoutEffect, useRef } from "react";
import { Boot } from "./scenes/Boot";
import { MainMenu } from "./scenes/MainMenu";
import { AUTO, Game } from "phaser";
import { Preloader } from "./scenes/Preloader";
import { PlayScreen } from "./scenes/PlayScreen";
export interface IRefPhaserGame {
  game: Phaser.Game | null;
  scene: Phaser.Scene | null;
}

const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#028af8",
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { x: 0, y: 600 },
    },
  },
  scene: [Boot, Preloader, PlayScreen, MainMenu],
};

type PhaserGameProps = {
  handleMintAlertModal: () => void;
  handleTutorialModal: () => void;
  showMintAlert: boolean;
};
export const PhaserGame = ({
  handleMintAlertModal,
  handleTutorialModal,
  showMintAlert,
}: PhaserGameProps) => {
  const gameEl = useRef<Phaser.Game | null>(null);
  useLayoutEffect(() => {
    const game = new Game(config);

    game.registry.set("handleMintAlertModal", handleMintAlertModal);
    game.registry.set("handleTutorialModal", handleTutorialModal);
    game.registry.set("showMintAlert", showMintAlert);

    console.log({ showMintAlert });
    if (gameEl.current === null) {
      gameEl.current = game;
    }
    return () => {
      if (gameEl.current) {
        gameEl.current.destroy(true);
        if (gameEl.current !== null) {
          gameEl.current = null;
        }
      }
    };
  }, [showMintAlert]);

  return <div id="game-container"></div>;
};

export default PhaserGame;
