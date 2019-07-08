console.log("content.js loaded");

document.addEventListener("contextmenu", event => {
  console.log("contextmenu", event);

  mobilenet.load().then(model => {
    model.classify(event.target).then(predictions => {
      console.log("predictions", predictions);
    });
  });
});
