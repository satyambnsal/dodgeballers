import { useEffect, useState } from "react";
import { LoadScene, MainScene, MenuScene } from "./scenes";
import clsx from "clsx";
import { EVENTS, NETWORK_LAYER_KEY } from "./constants";
import { NetworkLayer } from "../dojo/createNetworkLayer";

export const PhaserLayer = ({
    networkLayer,
}: {
    networkLayer: NetworkLayer | null;
}) => {
    console.log("network layer props", networkLayer);
    const [game, setGame] = useState<Phaser.Game | null>();

    useEffect(() => {
        const config: Phaser.Types.Core.GameConfig = {
            width: 1280,
            height: "100%",
            parent: "castle-hex",
            type: Phaser.AUTO,
            scene: [LoadScene, MenuScene, MainScene],
            backgroundColor: "0xded6b6",
            scale: {
                autoCenter: Phaser.Scale.CENTER_BOTH,
                mode: Phaser.Scale.FIT,
            },
        };

        const game = new Phaser.Game(config);

        game.events.on(EVENTS.NETWORK_CONNECTION_FAILED, () => {
            alert(
                "Wallet generation is in progress. Usually it takes 5-8 seconds on first reload. Try Again once!"
            );
            if (networkLayer) {
                game.registry.set(NETWORK_LAYER_KEY, networkLayer);
            }
        });
        setGame(game);
        return () => {
            game.destroy(true);
        };
    }, []);

    useEffect(() => {
        if (networkLayer) {
            game?.registry.set(NETWORK_LAYER_KEY, networkLayer);
        }
    }, [networkLayer, game]);

    return <div id="castle-hex" className={clsx("bg-red")} />;
};
