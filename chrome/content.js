let stopTyping = false; // Flag to control the typing process

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.action === "startTyping") {
    stopTyping = false; // Reset the flag when starting to type
    try {
      // Read clipboard text
      const clipboardText = await navigator.clipboard.readText();
      if (!clipboardText) {
        console.warn("Clipboard is empty.");
        return;
      }

      // Get typing speed from storage
      chrome.storage.sync.get(["typingSpeed"], (data) => {
        const typingSpeed = data.typingSpeed || 150; // Default speed if not set

        // Simulate typing
        const text = clipboardText.split("");
        let index = 0;

        const typeChar = () => {
          if (stopTyping) {
            console.log("Typing stopped.");
            return; // Stop the typing process if the flag is set
          }

          const activeElement = document.activeElement;

          if (activeElement && (activeElement.tagName === "TEXTAREA" || activeElement.tagName === "DIV")) {
            activeElement.dispatchEvent(new InputEvent("input", { bubbles: true }));
            if (activeElement.tagName === "DIV") {
              activeElement.textContent += text[index];
            } else if (activeElement.tagName === "TEXTAREA") {
              activeElement.value += text[index];
            }

            index++;

            if (index < text.length) {
              setTimeout(typeChar, typingSpeed); // Use saved speed
            }
          } else {
            console.warn("Active element is not editable.");
          }
        };

        typeChar();
      });
    } catch (error) {
      console.error("Error reading clipboard or typing:", error);
    }
  } else if (message.action === "stopTyping") {
    stopTyping = true; // Set the flag to stop typing
  }
});
