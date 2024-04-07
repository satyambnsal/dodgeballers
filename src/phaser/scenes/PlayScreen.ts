import { Scene, Phaser } from "phaser";

export class PlayScreen extends Scene {
  constructor() {
    super("PlayScreen");
  }

  preload() {
    console.log("hi");
  }

  create() {
    const { width, height } = this.scale;
    const startBtn = this.add
      .image(width / 2, height / 2, "startImg")
      .setScale(0.8)
      .setInteractive({ useHandCursor: true });

    startBtn.on("pointerdown", () => {
      this.scene.start("MainMenu");
    });
  }
}
