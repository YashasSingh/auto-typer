chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startTyping") {
    chrome.scripting.executeScript({
      target: { tabId: sender.tab.id },
      files: ["content.js"]
    }, () => {
      chrome.runtime.sendMessage({ action: "injectText", text: message.text });
    });
  }
});
