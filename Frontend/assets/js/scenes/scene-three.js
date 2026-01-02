import { createHtmlInput } from "../helper/createInputField.js";
import { createSpeechBubble } from "../helper/createSpeechBubble.js";
import { API_BASE_URL } from "..//helper/config.js";

export const SceneThree = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, {
      key: "SceneThree"
    });
  },

  create: function () {
    /* Start of loading the background and covering it fully */
    this.cam = this.cameras.main;
    // main camera of the scene
    const bg = this.add.image(this.cam.centerX, this.cam.centerY, "background");
    // add background image
    bg.setDisplaySize(this.cam.width, this.cam.height);
    // apply scale and center
    /* End of loading the background and covering it fully */

    /* Start of Femme's idle animation */
    this.anims.create({
      // define idle animation
      key: "femme-idle",
      frames: this.anims.generateFrameNumbers("femme", {
        start: 0,
        // frames start from 0th index.
        end: 12,
      }),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      // define idle animation
      key: "femme-attitude",
      frames: this.anims.generateFrameNumbers("femme_attitude", {
        start: 0,
        // frames start from 0th index.
        end: 23,
      }),
      frameRate: 24,
      repeat: -1,
    });

    this.femme = this.add.sprite(750, 1200, "femme").setScale(2);
    // add sprite to scene
    this.femme.setDisplaySize(380, 980);
    // Explicitly set width and height (pixels)
    this.femme.play("femme-idle");
    // start idle animation with the name defined above
    /* End of Femme's idle animation */

    /* Start of Johnny's walking animation and controls */
    this.player = this.physics.add.sprite(100, 1200, "johnny").setScale(2);
    // add sprite to scene
    this.player.setDisplaySize(380, 980);
    // Explicitly set width and height (pixels)
    this.player.setCollideWorldBounds(true);
    // Prevents the player from going out of bounds
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("johnny", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{
        key: "johnny",
        frame: 8
      }],
      // single frame for turning. The last frame of the walking animation. Check the sprite sheet.
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("johnny", {
        start: 0,
        // Same frames as left animation but played in reverse in the update function below.
        end: 7,
      }),
      frameRate: 10,
      repeat: -1,
    });
    /* End of Johnny's walking animation */

    /* Start of keyboard controls */
    this.cursors = this.input.keyboard.createCursorKeys();
    /* End of keyboard controls */

    /* Start of loading the button and placing it at the center bottom */
    const button = this.add.image(this.sys.game.config.width - 50, 100, "chat-icon");
    // Add button image at camera center
    button.setDisplaySize(80, 80);
    // Explicitly set width and height (pixels)

    // Make interactive with correct hit area
    button.setInteractive({
      useHandCursor: true,
    });

    let activeInput = null;
    button.on("pointerdown", () => {

      if (activeInput) {
        //remove existing input field if any
        activeInput.remove();
        activeInput = null;
        return;
        // Prevent multiple input fields
      }

      activeInput = createHtmlInput(this, 725, 370, {
        placeholder: "Flirt with Femme...",
      });

      activeInput.addEventListener("keydown", async (e) => {
        if (e.key === "Enter") {
          console.log("You typed:", e.target.value);
          createSpeechBubble(this, // the scene as an argument
            this.player.x, // x-coordinate
            0.6 * this.player.y, // y-coordinate
            5000, // bubble display time in milliseconds
            e.target.value, {
            maxTextWidth: 260
          }// tweak as you like
          );
          // Create a speech bubble at (Johnny's position) with width 300 and height 100
          activeInput.value = "";
          // <-- Clear after rendering
          activeInput.placeholder = "Flirt with Femme...";
          // Optional: reset placeholder

          try {
            const res = await fetch(`${API_BASE_URL}/chat`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                message: e.target.value
              }),
              // send user input to backend
            });

            if (!res.ok) {
              const text = await res.text();
              throw new Error(`Server error: ${res.status} ${text}`);
            }

            const data = await res.json();
            createSpeechBubble(this, this.femme.x - 50, 0.6 * this.femme.y - 170, // show above the player
              7000, // bubble display time in milliseconds
              data.reply || "(no reply)", {
              maxTextWidth: 260
            }// tweak as you like
            );

            // Change sprite/animation based on sentiment
            switch (data.sentiment) {
              case "angry":
                this.femme.play("femme-attitude");
                break;
              case "happy":
                this.femme.play("femme-attitude");
                break;
              case "flirty":
                this.femme.play("femme-attitude");
                break;
              default:
                this.femme.play("femme-idle");
            }
          } catch (err) {
            console.error(err);
            createSpeechBubble(this, this.femme.x, 0.6 * this.femme.y - 120, // show above the player
              3000, // bubble display time in milliseconds
              "Error: " + String(err), {
              maxTextWidth: 260
            }// tweak as you like
            );
          }
        }
      }
      );
    }
    );
  },
  update: function () {
    const pointer = this.input.activePointer;
    // Get the active pointer (mouse or touch)

    if (this.cursors.left.isDown || (pointer.isDown && pointer.x < this.sys.game.config.width / 2)) {
      /*
(pointer.isDown && pointer.x < this.sys.game.config.width / 2) -> If the pointer is pressed and is in the left half of the screen then move left.
*/
      this.player.setVelocityX(-160);
      // Move left at speed 160
      this.player.anims.play("left", true);
      // Play the left animation
      this.player.flipX = true;
      // resets the flip
      this.player.setDisplaySize(380, 980); // Normal size for walking
    } else if (this.cursors.right.isDown || (pointer.isDown && pointer.x >= this.sys.game.config.width / 2)) {
      this.player.setVelocityX(160);
      // Move right at speed 160
      this.player.anims.play("right", true);
      // Play the right animation
      this.player.flipX = false;
      // flips the sprite horizontally
      this.player.setDisplaySize(380, 980); // Normal size for walking
    } else {
      this.player.setVelocityX(0);
      // Stop moving
      this.player.anims.play("turn");
      // Play the turn animation (idle) defined above.
      this.player.setDisplaySize(420, 1050);
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
      // Jump up at speed 330
    }
  },
});
