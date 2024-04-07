import { GameObjects, Scene  } from "phaser";

import { EventBus } from "../EventBus";

export class MainMenu extends Scene {
  background: GameObjects.Image;
  logo: GameObjects.Image;
  targetImg: GameObjects.Image;
  bomb: GameObjects.Image;
  title: GameObjects.Text;
  logoTween: Phaser.Tweens.Tween | null;
  fallingBombSound: any;

  constructor() {
    super("MainMenu");
  }
  create() {
    this.physics.world.gravity.set(0, 0);
  
    const { width, height } = this.scale;
    const cannon = this.add.image(130, 464, 'cannon_body').setDepth(1);
    this.fallingBombSound = this.sound.add('fallingBomb')

    this.cannonHead = this.add.image(130, 416, 'cannon_head').setDepth(1).setInteractive();

    const launchBtn = this.add.image(width / 2, height - 100, 'launchBtnImg').setScale(0.8).setInteractive();
    this.bomb = this.physics.add.image(cannon.x, cannon.y - 50, 'bomb').setScale(0.3);
    this.targetImg = this.physics.add.image(width / 2 , 300,  'targetImg');
    this.targetImg.setGravity(0, 0);
    
    this.graphics = this.add.graphics({ lineStyle: { width: 10, color: 0xffdd00, alpha: 0.5 } });

    this.bomb.disableBody(true, true);

    this.angle = 0;

    // this.angle = calcAngle(
    //   target.x - cannon.x,
    //   world.gravity.y,
    //   PARAMS.launchSpeed
    // );

    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('boom', { start: 0, end: 23 }),
      frameRate: 20,
    })


    // Drag event handling for cannon head
    this.input.setDraggable(this.cannonHead);
    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        this.angle = Phaser.Math.Angle.BetweenPoints(cannon, pointer);
        this.cannonHead.rotation = this.angle;
        Phaser.Geom.Line.SetToAngle(this.line, cannon.x, cannon.y - 50, this.angle, 128);
        this.graphics.clear().strokeLineShape(this.line);
    });

    this.physics.add.collider(this.targetImg, this.bomb, () => {
      this.add.sprite(this.bomb.x, this.bomb.y , 'boom').setOrigin(0.5 , 0.5).play('explode');
      this.bomb.disableBody(true , true)
    }, null, this)

    // Launch button click event handling
    launchBtn.on('pointerdown', () => {
        this.bomb.enableBody(true, cannon.x, cannon.y - 50, true, true);
        this.physics.velocityFromRotation(this.angle, 600, this.bomb.body.velocity);
        this.fallingBombSound.play()

      });

    this.line = new Phaser.Geom.Line();
    // this.scene.start("MainMenu");
  }
}
