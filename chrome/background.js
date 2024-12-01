chrome.commands.onCommand.addListener(async (command) => {
  if (command === "startTyping") {
    try {
      // Access clipboard content
      const clipboardText = await navigator.clipboard.readText();

      // Inject the typing script into the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["content.js"]
        }, () => {
          // Pass clipboard content to the content script
          chrome.tabs.sendMessage(tabs[0].id, { action: "startTyping", text: clipboardText });
        });
      });
    } catch (error) {
      console.error("Error reading clipboard:", error);
    }
  }
});
