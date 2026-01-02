// 🔹 SceneCompanyLogo definition
export const SceneCompanyLogo = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, {
            key: "SceneCompanyLogo"
        });
    },

    create: function () {
        /* Start of loading the background and covering it fully */
        // main camera of the scene
        const cam = this.cameras.main;
        /* Start of loading the company-title and placing it */

        this.add.image(cam.centerX, cam.centerY, "company_logo");
        // Add image at x=this.cameras.main.centerX, y=this.cameras.main.centerY - 100
        // logo.setDisplaySize(1000, 1800);
        /* End of loading the company-title and placing it at the upper center */

        this.time.delayedCall(2000, () => { // 2s delay before starting fade out
            this.cameras.main.fadeOut(1000, 0, 0, 0); // 1s fade out, black
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("LoaderScene", {
                    nextScene: "SceneIntro",
                    assets: [{
                        type: "image",
                        key: "game_title",
                        path: "assets/graphics/sceneIntro/game-title.png",
                    }],
                }, this);
            });
        });
    },
});
