console.log("MobileNet content.js script loaded");

for (let idx = 0; idx < document.images.length; idx++) {
  const image = document.images[idx];

  // Filter out small images
  if (image.width > 50 && image.height > 50) {
    chrome.runtime.sendMessage({ imageSrc: image.currentSrc }, response => {
      console.log("response", response);

      const imageBbox = image.getBoundingClientRect();

      const overlay = document.createElement("div");
      overlay.innerHTML = JSON.stringify(response);
      overlay.style.position = "absolute";
      overlay.style.left = `${imageBbox.left}px`;
      overlay.style.top = `${imageBbox.top}px`;
      overlay.style.width = `${image.width}px`;
      overlay.style.color = "#fff";
      overlay.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      overlay.style.zIndex = "100000";
      document.body.appendChild(overlay);
    });
  }
}
