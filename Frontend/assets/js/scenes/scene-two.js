// 🔹 SceneOne definition
export const SceneTwo = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {
            key: "SceneTwo"
        });
    },

    create: function() {
        /* Start of loading the poster for sceneTwo and placing it at the upper center */
        const poster = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 500, "Femme_Introduction");
        // Add image at x=this.cameras.main.centerX, y=this.cameras.main.centerY - 100
        poster.setDisplaySize(600, 600);
        // Explicitly set width and height (pixels)
        /* End of loading the poster and placing it at the upper center */

        /* Start of loading the introduction text and placing it at the center bottom */
        this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2 - 20, "Meet Femme: a dazzling troublemaker... a sly femme fatale... beautiful but dangerous, sharp-tongued villainess who charms and deceives in equal measure. She always plays for herself.", {
            fontSize: "48px",
            color: "#000000",
            fontFamily: "ComicSansMS",
            fontStyle: "bold",
            wordWrap: {
                width: this.cameras.main.width / 1.5,
                useAdvancedWrap: true,
            },
        }).setOrigin(0.5, 0.2);
        /* End of loading the introduction text and placing it at the center bottom */

        /* Start of loading the button and placing it at the center bottom */
        const button = this.add.image(this.cameras.main.centerX + 20, this.cameras.main.centerY + 620, "button");
        // Add button image at camera center
        button.setDisplaySize(800, 250);
        // Explicitly set width and height (pixels)

        // Make interactive with correct hit area
        button.setInteractive({
            useHandCursor: true,
        });

        button.on("pointerdown", () => {
            this.scene.start("LoaderScene", {
                nextScene: "SceneThree",
                assets: [{
                    type: "image",
                    key: "background",
                    path: "assets/graphics/sceneThree/background.png",
                }, {
                    type: "spritesheet",
                    key: "femme",
                    path: "assets/graphics/sceneThree/Femme_idle.png",
                    frameWidth: 375,
                    // Pass the frame width
                    frameHeight: 666,
                    // Pass the frame height
                }, {
                    type: "spritesheet",
                    key: "femme_attitude",
                    path: "assets/graphics/sceneThree/Femme_attitude.png",
                    frameWidth: 375,
                    // Pass the frame width
                    frameHeight: 666,
                    // Pass the frame height
                }, {
                    type: "spritesheet",
                    key: "johnny",
                    path: "assets/graphics/sceneThree/johnny_walks.png",
                    frameWidth: 247,
                    // Pass the frame width
                    frameHeight: 352,
                    // Pass the frame height
                }, {
                    type: "image",
                    key: "chat-icon",
                    path: "assets/graphics/chat-icon.png",
                }, ],
            }, this);
        }
        );
        this.add.text(this.cameras.main.width / 2 + 20, this.cameras.main.height / 2 + 620, "CONTINUE", {
            fontSize: "88px",
            color: "#ffffff",
            fontFamily: "ComicSansMS",
            fontStyle: "bold",
        }).setOrigin(0.5);
        /* End of loading the button and placing it at the center bottom */
    },

    update: function() {},
});
