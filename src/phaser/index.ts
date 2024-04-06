// import { createPhaserEngine } from "@latticexyz/phaserx";
import { NetworkLayer } from "../dojo/createNetworkLayer";
import { namespaceWorld } from "@dojoengine/recs";
// import { TILE_HEIGHT, TILE_WIDTH } from "./config/constants";
import Phaser from "phaser";
// import { Scenes } from "./constants";

export type PhaserLayer = Awaited<ReturnType<typeof createPhaserLayer>>;

export const createPhaserLayer = async (
    networkLayer: NetworkLayer,
    phaserConfig: Phaser.Types.Core.GameConfig
) => {
    const world = namespaceWorld(networkLayer.world, "phaser");
    const phaserGame = new Phaser.Game(phaserConfig);

    world.registerDisposer(() => {
        phaserGame.destroy(true);
    });

    // const { camera } = scenes.Main;
    // camera.phaserCamera.setBounds(0, 0, TILE_WIDTH * 50, TILE_HEIGHT * 50);
    // camera.phaserCamera.centerOn(1500, 1500);

    const components = {};
    const layer = {
        networkLayer,
        world,
        game: phaserGame,
        scenes: phaserGame.scene.keys,
        components,
    };

    console.log("=== layer ===", layer);

    return layer;
};
