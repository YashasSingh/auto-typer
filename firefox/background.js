chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { text, speed } = message;

  // Wait for 5 seconds, then send the message to the content script
  setTimeout(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { text, speed });
      }
    });
  }, 5000); // 5-second delay
});
