import { Boot } from "./scenes/Boot";
import { MainMenu } from "./scenes/MainMenu";
import { AUTO, Game } from "phaser";
import { Preloader } from "./scenes/Preloader";
import { PlayScreen } from "./scenes/PlayScreen";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
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

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
