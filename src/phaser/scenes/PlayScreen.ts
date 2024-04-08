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
      const handleMintAlertModal = this.game.registry.get(
        "handleMintAlertModal"
      );

      const handleTutorialModal = this.game.registry.get("handleTutorialModal");
      const showMintAlert = this.game.registry.get("showMintAlert");
      const isShowTutorial = window.sessionStorage.getItem("is_show_tutorial");
      if (showMintAlert) {
        handleMintAlertModal();
        return;
      }
      handleTutorialModal();
      // if (!checkEntryFeesPaid) {
      //   return handleEntryFees();
      // }
      this.clickSound.play();
      this.scene.start("MainMenu");
    });
  }
}
