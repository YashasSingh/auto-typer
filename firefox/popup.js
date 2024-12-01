document.getElementById("start").addEventListener("click", () => {
  const text = document.getElementById("text").value;
  const speed = parseInt(document.getElementById("speed").value, 10);

  // Send the message to the background script
  chrome.runtime.sendMessage({ text, speed });
});
