document.addEventListener("DOMContentLoaded", async () => {
  const speedInput = document.getElementById("speed");
  const autoStopCheckbox = document.getElementById("autoStop");
  const clipboardPreview = document.getElementById("clipboardPreview");
  const startButton = document.getElementById("startTyping");
  const stopButton = document.getElementById("stopTyping");
  

  // Fetch clipboard content and preview it
  try {
    const clipboardText = await navigator.clipboard.readText();
    clipboardPreview.value = clipboardText.slice(0, 100); // Show first 100 characters
  } catch (error) {
    clipboardPreview.value = "Error: Unable to access clipboard.";
  }

  // Start typing with selected settings
  startButton.addEventListener("click", () => {
    const speed = parseInt(speedInput.value, 10);
    const autoStop = autoStopCheckbox.checked;

    chrome.runtime.sendMessage({
      action: "startTyping",
      speed,
      autoStop
    });
  });

  // Stop typing
  stopButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "stopTyping" });
  });
});
const speedRange = document.getElementById("speedRange");
const speedDisplay = document.getElementById("speed");
const estimateDisplay = document.getElementById("estimate");
const saveButton = document.getElementById("saveSettings");

let clipboardLength = 0;

// Update speed display
speedRange.addEventListener("input", () => {
  speedDisplay.textContent = speedRange.value;
  updateEstimate();
});

// Update estimate time
async function updateEstimate() {
  try {
    const clipboardText = await navigator.clipboard.readText();
    clipboardLength = clipboardText.length;
    const time = (clipboardLength * speedRange.value) / 1000;
    estimateDisplay.textContent = `${time.toFixed(2)} seconds`;
  } catch (error) {
    estimateDisplay.textContent = "N/A";
  }
}

// Save settings to storage
saveButton.addEventListener("click", () => {
  const speed = parseInt(speedRange.value, 10);
  chrome.storage.sync.set({ typingSpeed: speed }, () => {
    alert("Settings saved!");
  });
});

// Initialize the UI
chrome.storage.sync.get(["typingSpeed"], (data) => {
  if (data.typingSpeed) {
    speedRange.value = data.typingSpeed;
    speedDisplay.textContent = data.typingSpeed;
  }
  updateEstimate();
});
