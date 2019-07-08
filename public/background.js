mobilenet.load().then(model => {
  console.log("mobilenet model loaded");
  chrome.contextMenus.create({
    title: "Label image with MobileNet",
    contexts: ["image"],
    onclick: function(item) {
      convertBase64ImageToImageData(item.srcUrl).then(imageData => {
        model.classify(imageData).then(predictions => {
          console.log("predictions", predictions);
          alert(JSON.stringify(predictions, null, 4));
        });
      });
    }
  });
});

function convertBase64ImageToImageData(dataURI) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = dataURI;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      resolve(context.getImageData(0, 0, image.width, image.height));
    };
  });
}
