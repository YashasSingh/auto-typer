chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "startTyping") {
    const text = message.text.split("");
    let index = 0;

    const typeChar = () => {
      const activeElement = document.activeElement;

      if (activeElement && (activeElement.tagName === "TEXTAREA" || activeElement.tagName === "DIV")) {
        // Simulate typing by adding one character at a time
        activeElement.dispatchEvent(new InputEvent("input", { bubbles: true }));
        if (activeElement.tagName === "DIV") {
          activeElement.textContent += text[index];
        } else if (activeElement.tagName === "TEXTAREA") {
          activeElement.value += text[index];
        }

        index++;

        if (index < text.length) {
          setTimeout(typeChar, Math.random() * 150 + 50); // Random delay for realism
        }
      }
    };

    typeChar();
  }
});
