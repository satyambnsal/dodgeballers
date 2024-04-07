import Phaser from "phaser";

export class LoadScene extends Phaser.Scene {
  constructor() {
    super("load");
  }
  
  cannon: Phaser.GameObjects.Sprite;
  cannonHead: Phaser.GameObjects.Image; // Define cannonHead property
  bomb: Phaser.Physics.Arcade.Image; // Define bomb property
  graphics: Phaser.GameObjects.Graphics; // Define graphics property
  angle: number; // Define angle property

  preload() {
    this.load.image('cannon_head', 'assets/cannon_head.png');
    this.load.image('cannon_body', 'assets/cannon_body.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('launchBtnImg', 'assets/launchBtn.png');
  }

  create() {
    const { width, height } = this.scale;
    const cannon = this.add.image(130, 464, 'cannon_body').setDepth(1);

    // Assign cannonHead sprite to the property and make it draggable
    this.cannonHead = this.add.image(130, 416, 'cannon_head').setDepth(1).setInteractive();

    const launchBtn = this.add.image(width / 2, height - 100, 'launchBtnImg').setScale(0.4).setInteractive();

    this.bomb = this.physics.add.image(cannon.x, cannon.y - 50, 'bomb').setScale(0.3);
    this.graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });

    this.bomb.disableBody(true, true);

    this.angle = 0;

    // Drag event handling for cannon head
    this.input.setDraggable(this.cannonHead);
    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        this.angle = Phaser.Math.Angle.BetweenPoints(cannon, pointer);
        this.cannonHead.rotation = this.angle;
        Phaser.Geom.Line.SetToAngle(this.line, cannon.x, cannon.y - 50, this.angle, 128);
        this.graphics.clear().strokeLineShape(this.line);
    });

    // Launch button click event handling
    launchBtn.on('pointerdown', () => {
        this.bomb.enableBody(true, cannon.x, cannon.y - 50, true, true);
        this.physics.velocityFromRotation(this.angle, 600, this.bomb.body.velocity);
    });

    this.line = new Phaser.Geom.Line();
  }

  update() {
    // Your update logic...
  }
}
