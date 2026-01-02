// 🔹 SceneDisclaimer definition
export const SceneDisclaimer = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function () {
        Phaser.Scene.call(this, {
            key: "SceneDisclaimer"
        });
    },

    create: function () {
        /* Start of loading the background and covering it fully */
        // main camera of the scene
        const cam = this.cameras.main;

        // add background image
        this.add.image(cam.centerX, cam.centerY, "poster_background");

        /* Start of Disclaimer text */
        this.add.text(cam.width / 2 + 20, cam.height / 4, "Disclaimer", {
            fontSize: "88px",
            color: "#ad0606ff",
            fontFamily: "ComicSansMS",
            fontStyle: "bold",
        }).setOrigin(0.5);

        this.add.text(cam.width / 3 + 152, cam.height / 3,
            "Johnny Bravo and all related characters, designs, and trademarks", {
            fontSize: "30px",
            color: "#050505ff",
            fontFamily: "ComicSansMS",
            fontStyle: "bold",
        }).setOrigin(0.5);

        this.add.text(cam.width / 3 + 152, cam.height / 3 + 50,
            "are the property of their respective owners.", {
            fontSize: "30px",
            color: "#050505ff",
            fontFamily: "ComicSansMS",
            fontStyle: "bold",
        }).setOrigin(0.5);

        this.add.text(cam.width / 3 + 152, cam.height / 3 + 100,
            "\nI do not own Johnny Bravo or any associated intellectual property.", {
            fontSize: "30px",
            color: "#ad0606ff",
            fontFamily: "ComicSansMS",
            fontStyle: "bold",
        }).setOrigin(0.5);

        this.add.text(cam.width / 3 + 152, cam.height / 3 + 150,
            "\n\nThis project is a personal, non-commercial learning project created", {
            fontSize: "30px",
            color: "#050505ff",
            fontFamily: "ComicSansMS",
            fontStyle: "bold",
        }).setOrigin(0.5);

        this.add.text(cam.width / 3 + 152, cam.height / 3 + 200,
            "\nsolely for educational and practice purposes, including design,", {
            fontSize: "30px",
            color: "#050505ff",
            fontFamily: "ComicSansMS",
            fontStyle: "bold",
        }).setOrigin(0.5);

        this.add.text(cam.width / 3 + 152, cam.height / 3 + 250,
            "animation, and technical experimentation.", {
            fontSize: "30px",
            color: "#050505ff",
            fontFamily: "ComicSansMS",
            fontStyle: "bold",
        }).setOrigin(0.5);


        this.add.text(cam.width / 3 + 150, cam.height / 3 + 300,
            "\n\nNo copyright infringement is intended.", {
            fontSize: "30px",
            color: "#050505ff",
            fontFamily: "ComicSansMS",
            fontStyle: "bold",
        }).setOrigin(0.5);
        /* End of Disclaimer text */

        this.time.delayedCall(2000, () => { // 2s delay before starting fade out
            this.cameras.main.fadeOut(1000, 0, 0, 0); // 1s fade out, black
            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start("LoaderScene", {
                    nextScene: "SceneCompanyLogo",
                    assets: [{
                        type: "image",
                        key: "company_logo",
                        path: "assets/graphics/sceneCompanyLogo/company-logo.png",
                    }],
                }, this);
        });
    });
    },
});
