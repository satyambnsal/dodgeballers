import { GameObjects, Scene } from "phaser";

export class Boot extends Scene {
  constructor() {
    super("Boot");
  }
  title: GameObjects.Text | undefined;
  preload() {
    this.load.image("background", "assets/bg.png");
  }

  create() {
    this.title = this.add
      .text(512, 460, "Main Menu", {
        fontFamily: "Arial Black",
        fontSize: 38,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5)
      .setDepth(100);
    this.scene.start("Preloader");
  }
}
