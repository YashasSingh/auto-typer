chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { text, speed } = message;
  const activeElement = document.activeElement;

  if (activeElement && (activeElement.tagName === "INPUT" || activeElement.tagName === "TEXTAREA")) {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        activeElement.value += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, speed);
  }
});
