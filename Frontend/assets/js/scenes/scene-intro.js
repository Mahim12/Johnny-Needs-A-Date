// 🔹 SceneOne definition
export const SceneIntro = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, {
            key: "SceneIntro"
        });
    },

    create: function () {
        /* Start of loading the background and covering it fully */
        // main camera of the scene
        const cam = this.cameras.main;
        /* Start of loading the game-title and placing it */
        this.add.image(cam.centerX, cam.centerY, "game_title");
        /* End of loading the game-title and placing it at the upper center */

        this.time.delayedCall(2000, () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0); // 1s fade out, black
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("LoaderScene", {
                    nextScene: "SceneOne",
                    assets: [
                        { 
                            type: "image", 
                            key: "poster_background", 
                            path: "assets/graphics/sceneOne/poster_background.png" 
                        },
                        { 
                            type: "image", 
                            key: "poster", 
                            path: "assets/graphics/sceneOne/poster.png" 
                        },
                        { 
                            type: "image", 
                            key: "button", 
                            path: "assets/graphics/button.png" 
                        }
                    ],
                }, this);
            });
        });
    },
});
