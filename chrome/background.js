chrome.runtime.onMessage.addListener((message) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (message.action === "startTyping") {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["content.js"]
      }, () => {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "startTyping",
          speed: message.speed,
          autoStop: message.autoStop
        });
      });
    } else if (message.action === "stopTyping") {
      chrome.tabs.sendMessage(tabs[0].id, { action: "stopTyping" });
    }
  });
});
