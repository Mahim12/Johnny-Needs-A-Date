// 🔹 SceneOne definition
export const SceneOne = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: "SceneOne" });
  },

  create: function () {
    /* Start of loading the background and covering it fully */
    const cam = this.cameras.main; // main camera of the scene
    const bg = this.add.image(cam.centerX, cam.centerY, "poster_background"); // add background image
    // Calculate scale factors for width and height
    const scaleX = cam.width / bg.width;
    const scaleY = cam.height / bg.height;

    // Choose the larger scale factor to ensure coverage
    const scale = Math.max(scaleX, scaleY);

    // Apply the scale and center the background
    bg.setScale(scale);
    bg.setPosition(cam.width / 2, cam.height / 2);
    /* End of loading the background and covering it fully */

    /* Start of loading the poster and placing it at the upper center */
    const poster = this.add.image(
      this.cameras.main.centerX,
      this.cameras.main.centerY - 100,
      "poster"
    ); // Add image at x=this.cameras.main.centerX, y=this.cameras.main.centerY - 100
    poster.setDisplaySize(800, 800); // Explicitly set width and height (pixels)
    /* End of loading the poster and placing it at the upper center */

    /* Start of loading the button and placing it at the center bottom */
    const button = this.add.image(
      this.cameras.main.centerX + 20,
      this.cameras.main.centerY + 420,
      "button"
    ); // Add button image at camera center
    button.setDisplaySize(800, 250); // Explicitly set width and height (pixels)

    // Make interactive with correct hit area
    button.setInteractive({
      useHandCursor: true,
    });

    button.on("pointerdown", () => {
      //this.scene.start("SceneTwo");
      //this.scene.start("LoadingScene", { next: "SceneTwo" });
      this.scene.start(
        "LoaderScene",
        {
          nextScene: "SceneTwo",
          assets: [
            {
              type: "image",
              key: "Femme_Introduction",
              path: "assets/graphics/sceneTwo/femmeIntro.jpg",
            },
            {
              type: "image",
              key: "button",
              path: "assets/graphics/button.png",
            },
          ],
        },
        this
      );
    });
    this.add
      .text(
        this.cameras.main.width / 2 + 20,
        this.cameras.main.height / 2 + 420,
        "PLAY",
        {
          fontSize: "88px",
          color: "#ffffff",
          fontFamily: "ComicSansMS",
          fontStyle: "bold",
        }
      )
      .setOrigin(0.5);
    /* End of loading the button and placing it at the center bottom */
  },

  update: function () {},
});
