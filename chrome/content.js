chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "injectText") {
    const text = message.text.split("");
    let index = 0;

    const typeChar = () => {
      const activeElement = document.activeElement;

      if (activeElement.tagName === "TEXTAREA" || activeElement.tagName === "DIV") {
        activeElement.dispatchEvent(new InputEvent("input", { bubbles: true }));
        activeElement.textContent += text[index];
        index++;

        if (index < text.length) {
          setTimeout(typeChar, Math.random() * 150 + 50); // Random delay for realism
        }
      }
    };

    typeChar();
  }
});
