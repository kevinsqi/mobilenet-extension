console.log("MobileNet content.js script loaded");

for (let idx = 0; idx < document.images.length; idx++) {
  const image = document.images[idx];

  // Filter out small images
  if (image.width > 50 && image.height > 50) {
    chrome.runtime.sendMessage({ imageSrc: image.currentSrc }, response => {
      console.log("response", response);

      const imageParent = image.parentNode;
      const container = document.createElement("div");
      container.style.position = "relative";
      container.style.width = `${image.width}px`;
      container.style.height = `${image.height}px`;
      const imageWrapper = document.createElement("div");
      imageWrapper.style.position = "absolute";
      const overlay = document.createElement("div");
      overlay.style.width = "100%";
      overlay.style.position = "absolute";
      overlay.style.bottom = 0;
      overlay.style.left = 0;
      overlay.innerHTML = JSON.stringify(response);

      imageWrapper.appendChild(image);
      container.appendChild(imageWrapper);
      container.appendChild(overlay);
      imageParent.appendChild(container);
    });
  }
}
