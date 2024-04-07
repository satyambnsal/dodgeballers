import { Scene } from "phaser";

export class PlayScreen extends Scene {
  clickSound: any;

  constructor() {
    super("PlayScreen");
  }

  preload() {}

  create() {
    this.clickSound = this.sound.add("clickSound");
    const { width, height } = this.scale;
    const startBtn = this.add
      .image(width / 2, height / 2, "startImg")
      .setScale(0.8)
      .setInteractive({ useHandCursor: true });

    startBtn.on("pointerdown", () => {
      this.clickSound.play();
      this.scene.start("MainMenu");
    });
  }
}
