export class LoaderScene extends Phaser.Scene {
    constructor() {
        super({
            key: "LoaderScene"
        });
        this.assetsToLoad = [];
        // Array of assets to load
        this.nextSceneKey = null;
        // Key of the next scene to start
        this.loadingText = null;
        // Declare the text object as a property
    }

    init(data) {
        this.assetsToLoad = data.assets || [];
        this.nextSceneKey = data.nextScene;
    }

    preload() {
        // Create the visual elements, including the text
        this.createProgressBar();
        this.loadAssets();

        // Listen for the 'complete' event to start the next scene
        this.load.on("complete", () => {
            this.scene.start(this.nextSceneKey);
        }
        );
    }

    createProgressBar() {
        const {width, height} = this.scale;
        // Get game width and height

        // Background for the progress bar
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x000103, 1.0);
        // Dark background color. 1.0 is fully opaque
        progressBox.fillRoundedRect(width / 4, height / 2 - 25, width / 2, 100, 20);
        // x, y, width, height, radius

        // Graphical progress bar
        const progressBar = this.add.graphics();

        // Text for the percentage
        this.loadingText = this.add.text(width / 2, height / 2 + 25, "0%", // Initial text
        {
            fontSize: "30px",
            fill: "#ffffff",
        }).setOrigin(0.5);
        // Center the text

        // Event listener for progress updates
        this.load.on("progress", (value) => {
            // Update the graphical bar
            // value is a float between 0 and 1 indicating the progress
            progressBar.clear();
            progressBar.fillStyle(0xc53b24, 1);
            progressBar.fillRoundedRect(width / 4 + 10, height / 2 - 15, 340 * value, 80, 20);

            // Update the text with the percentage
            this.loadingText.setText(`${Math.round(value * 100)}%`);
        }
        );
    }

    loadAssets() {
        this.assetsToLoad.forEach( (asset) => {
            if (asset.type === "image") {
                this.load.image(asset.key, asset.path);
            } else if (asset.type === "spritesheet") {
                this.load.spritesheet(asset.key, asset.path, {
                    frameWidth: asset.frameWidth,
                    frameHeight: asset.frameHeight,
                });
            }
            // Add more asset types here as needed
        }
        );
    }
}
