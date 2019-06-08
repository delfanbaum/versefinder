var contextMenuItem = {
    "id" : "addText",
    "title" : "Text to verse",
    "contexts" : ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){

 if (clickData.menuItemID == "addText" && clickData.selectionText){
     chrome.storage.sync.set({'text': String(clickData.selectionText)});
 };

});
