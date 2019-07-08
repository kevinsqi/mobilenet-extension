chrome.contextMenus.create({
  title: "Label image",
  contexts: ["image"],
  onclick: function(item) {
    console.log("context", item);
  }
});
