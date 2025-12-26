// helper/createSpeechBubble.js
export function createSpeechBubble(scene, x, y, bubbleTimer, quote, opts={}) {
    const padding = opts.padding ?? 10;
    const maxTextWidth = opts.maxTextWidth ?? 260;
    // max width before wrapping

    // 1) Create an off-screen text (NOT added to display list)
    const tempText = scene.make.text({
        x: 0,
        y: 0,
        text: quote,
        style: {
            fontFamily: "ComicSansMS",
            fontSize: "20px",
            color: "#000000",
            align: "center",
            wordWrap: {
                width: maxTextWidth
            },
        },
        add: false,
        // <- important: we only use this to measure
    });

    const bounds = tempText.getBounds();
    const textWidth = bounds.width;
    const textHeight = bounds.height;

    // 2) Compute bubble size based on text size
    const bubbleWidth = Math.min(textWidth, maxTextWidth) + padding * 2;
    // don’t exceed max width
    const bubbleHeight = textHeight + padding * 2;
    const arrowHeight = bubbleHeight / 4;

    tempText.destroy();
    // we don't need the measurement text anymore

    // 3) Draw the bubble
    const bubble = scene.add.graphics({
        x,
        y
    });

    // Bubble shadow
    bubble.fillStyle(0x222222, 0.5);
    bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

    // Bubble body
    bubble.fillStyle(0xffffff, 1);
    bubble.lineStyle(4, 0x565656, 1);
    bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
    bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

    // Arrow coordinates
    const point1X = Math.floor(bubbleWidth / 7);
    const point1Y = bubbleHeight;
    const point2X = Math.floor((bubbleWidth / 7) * 2);
    const point2Y = bubbleHeight;
    const point3X = Math.floor(bubbleWidth / 7);
    const point3Y = Math.floor(bubbleHeight + arrowHeight);

    // Arrow shadow
    bubble.lineStyle(4, 0x222222, 0.5);
    bubble.lineBetween(point2X - 1, point2Y + 6, point3X + 2, point3Y);

    // Arrow fill
    bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
    bubble.lineStyle(2, 0x565656, 1);
    bubble.lineBetween(point2X, point2Y, point3X, point3Y);
    bubble.lineBetween(point1X, point1Y, point3X, point3Y);

    // 4) Add final visible text, centered in bubble
    const content = scene.add.text(0, 0, quote, {
        fontFamily: "ComicSansMS",
        fontSize: 20,
        color: "#000000",
        align: "center",
        wordWrap: {
            width: bubbleWidth - padding * 2
        },
    });

    const b = content.getBounds();

    content.setPosition(bubble.x + bubbleWidth / 2 - b.width / 2, bubble.y + bubbleHeight / 2 - b.height / 2);

    // --- TIMER TO DESTROY BUBBLE AFTER 5 SECONDS ---
    scene.time.delayedCall(bubbleTimer, () => {
        bubble.destroy();
        content.destroy();
    }
    );

    // optional: return objects if you want to tween/destroy later
    return {
        bubble,
        content
    };
}
