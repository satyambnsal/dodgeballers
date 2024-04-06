import { HexGrid } from "../hex-grid";
import { Button } from "../util";
import { NetworkLayer } from "../../dojo/createNetworkLayer";
import Phaser from "phaser";
import { EVENTS, NETWORK_LAYER_KEY } from "../constants";
import { SetupResult } from "../../dojo/setup";

const tutorialTexts = [
    "Place trios of hexes to grow your city\noutward from the Castle\n\n\nTry to get the highest score you can!",
    "ROAD hexes are worth 1 point each\nif they're connected to the Castle\n\nAdditionally, every CITY-WALL that you\nconnect to the Castle with\nRoads is worth 3 points!",
    "WATCH TOWERS are worth 1 point if\nthey're not adjacent to any other\nWatch Towers\n\nIf they're also placed on a HILL,\nthey're worth 3 points!",
    "Those are PARKS!\n\nEach group of connected Park hexes is\nworth 5 points for every 3 hexes in it",
    "Yep! To recap:\n- Roads want to connect City-Wall to\nthe Castle\n- Watch Towers want to be alone and\non Hills\n- Parks want to be grouped together\nin multiples of 3",
];

// const gameJourneyTexts = [
//     {
//         heading: "Welcome, esteemed city planners and strategists!",
//         description:
//             "You have been summoned by the Lord of the Realm to the grand challenge of Castle Hexapolis, the digital realm where your urban planning skills and tactical acumen will be put to the test! This web-based browser game blends the charm of medieval citybuilding with the cerebral challenge of hexagonal tile placement. Prepare to embark on a journey of strategy, foresight, and creativity as you expand your city from a single Castle hex tile to a sprawling, interconnected metropolis.",
//     },
//     {
//         heading: "Game Objective",
//         description:
//             "Your mission in Castle Hexapolis is straightforward yet captivating: skilfully expand your city outward from the central Castle tile, utilising a variety of hex tiles to maximize your points. With ROADS, WATCH TOWERS, and PARKS hex tiles at your disposal, every decision can tilt the balance of power in this dynamic cityscape.",
//     },
// ];

const tutorialTypes = [[1, 2, 3, 4, 5], [3, 4, 5], [1], [2], [1, 2, 3, 4, 5]];

export class MenuScene extends Phaser.Scene {
    menu: Phaser.GameObjects.Group | null = null;
    background: Phaser.GameObjects.Image | null = null;
    tutorialGrid: HexGrid = {} as HexGrid;
    tutorialText: Phaser.GameObjects.BitmapText | null = null;
    tutorialPage = 0;
    tutorialButton: Button | null = null;
    constructor() {
        super("menu");
    }

    async create() {
        this.cameras.main.setBounds(-1280, 0, 3840, 720);
        this.menu = this.add.group();

        this.background = this.add.image(360, 360, "page");

        const map_pattern = this.add.image(920, 360, "map_pattern");
        map_pattern.setScale(0.05);
        map_pattern.setAlpha(0.3);

        const realmImage = this.add.image(250, 90, "realms_logo_black");
        realmImage.setScale(0.5);
        const title = this.add.bitmapText(
            50,
            150,
            "font",
            "Castle Hexapolis",
            70
        );
        const tagline = this.add.bitmapText(
            100,
            220,
            "font",
            "A Strategic City-Development Game",
            70
        );
        tagline.setScale(0.3);
        this.menu.add(title);

        const playButton = new Button(
            this,
            300,
            400,
            "play-button",
            this.play.bind(this)
        );
        this.menu.add(playButton);

        const howToPlayButton = new Button(
            this,
            300,
            550,
            "how-to-play-button",
            this.howToPlay.bind(this)
        );
        this.menu.add(howToPlayButton);

        const grid = new HexGrid(this, 3, 0, 700, 100);
        grid.grid.get(2, 2)!.setHill(true);
        grid.grid.get(4, 5)!.setHill(true);

        const tutorialGrid = [
            [null, null, null, 5, 3, 2, 5],
            [null, null, 2, 3, 2, 1, 3],
            [null, 2, 1, 3, 2, 3, 3],
            [5, 3, 2, 4, 2, 1, 5],
            [2, 2, 2, 3, 3, 1, null],
            [2, 2, 3, 1, 2, null, null],
            [5, 3, 3, 5, null, null, null],
        ];

        this.tutorialPage = 0;
        this.tutorialText = this.add.bitmapText(
            1280,
            200,
            "font",
            tutorialTexts[0],
            40
        );
        this.tutorialButton = new Button(
            this,
            1265,
            550,
            "next_arrow",
            this.nextTutorialPage.bind(this)
        );
        this.tutorialButton.setOrigin(0, 0.5);

        // this.tutorialButtonWatchTower.setOrigin(0, 0.5);

        for (let r = 0; r < tutorialGrid.length; r++) {
            for (let c = 0; c < tutorialGrid.length; c++) {
                if (grid.grid.has(r, c)) {
                    grid.grid.get(r, c)!.setType(tutorialGrid[r][c] as number);
                }
            }
        }

        grid.grid.get(0, 3)?.upgrade();
        grid.grid.get(0, 4)?.upgrade();
        grid.grid.get(0, 5)?.upgrade();
        grid.grid.get(1, 3)?.upgrade();
        grid.grid.get(1, 4)?.upgrade();
        grid.grid.get(1, 5)!.counted = true;
        grid.grid.get(2, 2)!.counted = true;
        grid.grid.get(2, 3)?.upgrade();
        grid.grid.get(2, 4)?.upgrade();
        grid.grid.get(3, 2)?.upgrade();
        grid.grid.get(4, 0)?.upgrade();
        grid.grid.get(4, 1)?.upgrade();
        grid.grid.get(4, 2)?.upgrade();
        grid.grid.get(4, 3)?.upgrade();
        grid.grid.get(4, 4)?.upgrade();
        grid.grid.get(5, 0)?.upgrade();
        grid.grid.get(5, 1)?.upgrade();
        grid.grid.get(5, 2)?.upgrade();
        grid.grid.get(5, 3)!.counted = true;
        grid.grid.get(6, 0)?.upgrade();
        grid.grid.get(6, 1)?.upgrade();
        grid.grid.get(6, 2)?.upgrade();
        grid.grid.get(6, 3)?.upgrade();

        grid.grid.get(0, 6)?.setVisible(false);
        grid.grid.get(3, 0)?.setVisible(false);
        grid.grid.get(3, 6)?.setVisible(false);

        grid.updateEdges();

        this.tutorialGrid = grid;

        this.add.bitmapText(-1160, 30, "font", "0 points", 60);

        const rotateLeftButton = new Button(this, -1185, 180, "rotate", () => {
            console.log("a");
        });
        rotateLeftButton.setFlipX(true);
        const rotateRightButton = new Button(this, -935, 180, "rotate", () => {
            console.log("a");
        });

        const deckCounterText = this.add.bitmapText(
            -1050,
            620,
            "font",
            "25",
            60
        );
        deckCounterText.setOrigin(0.5, 0.45);

        const deckCounterImage = this.add.image(-950, 720, "a-shape");
        deckCounterImage.setAlpha(0.5);

        const ambience = this.sound.add("ambience", {
            loop: true,
            volume: 0,
        });
        ambience.play();
        this.add.tween({
            targets: ambience,
            props: { volume: 0.8 },
            duration: 1000,
        });
    }

    async play() {
        const networkLayer: SetupResult = this.registry.get(NETWORK_LAYER_KEY);

        console.log(
            "######## CALLER ACCOUNT ######\n",
            networkLayer?.network.account.address,
            "\n###########"
        );
        if (!networkLayer || !networkLayer.network.account) {
            return this.game.events.emit(EVENTS.NETWORK_CONNECTION_FAILED);
        }

        const { network, systemCalls: { spawn } = {} } = networkLayer;
        const account = network?.account;

        try {
            spawn && (await spawn({ signer: account }));
        } catch (err) {
            console.log("Failed to call spawn", err);
        }

        this.cameras.main.pan(-1280, 0, 500, "Linear", true);

        this.time.addEvent({
            delay: 500,
            callback: this.transition,
            callbackScope: this,
        });
    }

    transition() {
        this.scene.start("main");
    }

    howToPlay() {
        this.tutorialPage = -1;
        this.nextTutorialPage();
        this.cameras.main.pan(1270, 0, 1000, "Power2");

        this.tutorialGrid.grid.get(0, 6)?.setVisible(true);
        this.tutorialGrid.grid.get(3, 0)?.setVisible(true);
        this.tutorialGrid.grid.get(3, 6)?.setVisible(true);
    }

    nextTutorialPage() {
        this.tutorialPage += 1;
        if (this.tutorialPage >= 5) {
            this.cameras.main.pan(640, 0, 1000, "Power2");
            this.tutorialGrid.grid.get(0, 6)?.setVisible(false);
            this.tutorialGrid.grid.get(3, 0)?.setVisible(false);
            this.tutorialGrid.grid.get(3, 6)?.setVisible(false);
        } else {
            console.log(this.tutorialPage);
            // this.tutorialButton!.setFrame(this.tutorialPage);
            this.tutorialText!.setText(tutorialTexts[this.tutorialPage]);
            for (const hex of this.tutorialGrid.hexes) {
                hex.setSketchy(
                    tutorialTypes[this.tutorialPage].indexOf(hex.hexType) === -1
                );
            }
        }
    }

    update(time: number, delta: number) {
        for (const hex of this.tutorialGrid.hexes) {
            hex.update(time, delta);
        }
    }
}
