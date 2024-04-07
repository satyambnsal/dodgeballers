import { Scene , Phaser} from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    this.add.image(512, 384, "background");
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);
    this.load.on("progress", (progress: number) => {
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    this.load.image('cannon_head', 'assets/cannon_head.png');
    this.load.image('cannon_body', 'assets/cannon_body.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('launchBtnImg', 'assets/launchBtn.png');
    this.load.image('launchBtnImg', 'assets/launchBtn.png');
    this.load.image('targetImg', 'assets/target.png');

    this.load.spritesheet('boom', 'assets/explosion.png', { frameWidth: 64, frameHeight: 64, endFrame: 23 });

    this.load.audio('fallingBomb', "./sounds/fallingBomb.mp3")
  }

  create() {
    this.scene.start("MainMenu");
  }
}
