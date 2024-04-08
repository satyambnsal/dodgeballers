import { GameObjects, Scene } from "phaser";

export class MainMenu extends Scene {
  background?: GameObjects.Image;
  logo?: GameObjects.Image;
  targetImg?: GameObjects.Image;
  bomb?: any;
  cannonHead!: GameObjects.Image;
  title?: GameObjects.Text;
  scoreText?: any;
  logoTween?: Phaser.Tweens.Tween | null;
  fallingBombSound: any;
  explosionSound: any;
  clickSound: any;
  score!: number;
  scoreUpdated: any;
  isHitted?: any;
  graphics?: any;
  angle!: number;
  line!: Phaser.Geom.Line;

  constructor() {
    super("MainMenu");
  }
  create() {
    this.physics.world.gravity.set(0, 0);

    this.isHitted = false;
    this.scoreUpdated = false;

    const { width, height } = this.scale;
    const cannon = this.add.image(130, 464, "cannon_body").setDepth(1);
    this.fallingBombSound = this.sound.add("fallingBomb");
    this.explosionSound = this.sound.add("explosion");
    this.clickSound = this.sound.add("clickSound");
    this.score = 0;

    this.scoreText = this.add
      .bitmapText(10, 10, "atari", "", 30)
      .setInteractive();

    this.scoreText.setText(`Score: ${this.score}`);

    this.cannonHead = this.add
      .image(130, 416, "cannon_head")
      .setDepth(1)
      .setInteractive({ useHandCursor: true });

    const launchBtn = this.add
      .image(width / 2, height - 100, "launchBtnImg")
      .setScale(0.8)
      .setInteractive({ useHandCursor: true });

    this.bomb = this.physics.add
      .image(cannon.x, cannon.y - 50, "bomb")
      .setScale(0.3);

    this.targetImg = this.physics.add
      .image(width / 1.2, 300, "targetImg")
      .setCollideWorldBounds(true)
      .setImmovable(true);

    this.graphics = this.add.graphics({
      lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 },
    });

    this.bomb.disableBody(true, true);

    this.angle = 0;

    this.line = new Phaser.Geom.Line();
    Phaser.Geom.Line.SetToAngle(
      this.line,
      cannon.x,
      cannon.y - 50,
      this.angle,
      128
    );
    this.graphics.strokeLineShape(this.line);

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("boom", { start: 0, end: 23 }),
      frameRate: 20,
    });

    // Drag event handling for cannon head
    this.input.setDraggable(this.cannonHead);
    this.input.on(
      "drag",
      (
        pointer: Phaser.Types.Math.Vector2Like,
        gameObject: any,
        dragX: any,
        dragY: any
      ) => {
        this.angle = Phaser.Math.Angle.BetweenPoints(cannon, pointer);
        this.cannonHead.rotation = this.angle;
        Phaser.Geom.Line.SetToAngle(
          this.line,
          cannon.x,
          cannon.y - 50,
          this.angle,
          128
        );
        this.graphics.clear().strokeLineShape(this.line);
      }
    );

    this.physics.add.collider(
      this.targetImg,
      this.bomb,
      () => {
        this.add
          .sprite(this.bomb.x + 20, this.bomb.y, "boom")
          .setOrigin(0.5, 0.5)
          .play("explode");
        this.bomb.disableBody(true, true);
        this.fallingBombSound.stop();
        this.explosionSound.play();
        this.isHitted = true;
        setTimeout(() => {
          this.targetImg!.y = Phaser.Math.Between(100, 500);
        }, 2000);
        if (!this.scoreUpdated) {
          this.updateScore();
        }
      },
      undefined,
      this
    );

    // Launch button click event handling
    launchBtn.on("pointerdown", () => {
      this.bomb.enableBody(true, cannon.x, cannon.y - 50, true, true);
      this.physics.velocityFromRotation(
        this.angle,
        600,
        this.bomb.body.velocity
      );
      this.scoreUpdated = false;
      this.clickSound.play();
      this.fallingBombSound.play();
    });

    this.line = new Phaser.Geom.Line();
    // this.scene.start("MainMenu");
  }

  update() {
    console.log(this.bomb.y);
    if (
      this.bomb.x > 800 ||
      this.bomb.x < 0 ||
      this.bomb.y < 0 ||
      this.bomb.y > 600
    ) {
      this.isHitted = false;
      if (!this.scoreUpdated) {
        this.updateScore();
      }
    }
  }

  updateScore() {
    if (this.isHitted) {
      this.score = this.score + 10;
      this.scoreText.setText(`Score: ${this.score}`);
    } else {
      this.score = this.score - 5;
      this.scoreText.setText(`Score: ${this.score}`);
    }
    this.scoreUpdated = true;
  }
}
