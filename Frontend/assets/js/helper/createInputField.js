export function createHtmlInput(scene, x, y, options = {}) {
  const { placeholder = "TSay something to Femme...", width = 1200, height = 300 } = options;

  // Get the Phaser canvas position on the page
  const canvas = scene.sys.game.canvas;
  const rect = canvas.getBoundingClientRect();

  // Compute final screen position
  const left = rect.left + x - width / 2;
  const top = rect.top + y - height / 2;

  // Create the actual HTML input element
  const inputEl = document.createElement("input");
  inputEl.type = "text";
  inputEl.id = "chat-input";
  inputEl.name = "chat-input";
  inputEl.placeholder = placeholder;
  inputEl.style.position = "fixed";
  inputEl.style.left = "111px";
  inputEl.style.top = `${top}px`;
  inputEl.style.width = `${width}px`;
  inputEl.style.height = `${height}px`;
  inputEl.style.borderRadius = "10px";
  inputEl.style.border = "2px solid #888";
  inputEl.style.paddingLeft = "55px";
  inputEl.style.paddingRight = "5px";
  inputEl.style.background = "rgba(255,255,255,0.9)";
  inputEl.style.zIndex = 9999;
  document.body.appendChild(inputEl);

  // Focus automatically
  inputEl.focus();

  // Optional: remove on Enter
  inputEl.addEventListener("keydown", (e) => {
    e.stopPropagation(); // The space bar wasn't working so this line fixed it
    if (e.key === "Enter") {
      console.log("Input value:", inputEl.value);
      inputEl.remove();
    }
  });

  // Remove when scene shuts down
  scene.events.once("shutdown", () => inputEl.remove());

  return inputEl;
}
