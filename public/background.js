mobilenet.load().then(model => {
  console.log("mobilenet model loaded");

  // Content script message handling
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const imageSrc = request.imageSrc;
    convertImageSrcToImageData(imageSrc).then(imageData => {
      model.classify(imageData).then(predictions => {
        sendResponse({ predictions: predictions });
      });
    });
    // Indicate that sendResponse is async
    return true;
  });

  // Context menu handling
  chrome.contextMenus.create({
    title: "Label image with MobileNet",
    contexts: ["image"],
    onclick: function(item) {
      convertImageSrcToImageData(item.srcUrl).then(imageData => {
        model.classify(imageData).then(predictions => {
          console.log("predictions", predictions);
          alert(JSON.stringify(predictions, null, 4));
        });
      });
    }
  });
});

function convertImageSrcToImageData(imageSrc) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      resolve(context.getImageData(0, 0, image.width, image.height));
    };
  });
}
