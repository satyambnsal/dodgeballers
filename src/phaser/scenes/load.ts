import Phaser from "phaser";

export class LoadScene extends Phaser.Scene {
  constructor() {
    super("load");
  }
  player: any;
  input: any;

  preload() {
    // this.load.image("player", "assets/house.png");
  }

  create() {
    // this.player = this.add.image(400, 300, "player");
    // this.player.setOrigin(0.5, 0.5);
  }

  update() {
    // if (
    //   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT).isDown
    // ) {
    //   this.player.x -= 5;
    // } else if (
    //   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT).isDown
    // ) {
    //   this.player.x += 5;
    // }
  }
}
