var contextMenuItemAddText = {
    "id" : "addTextFromSelection",
    "title" : "Add Text",
    "contexts" : ["selection"]
};
var contextMenuItemAddTextAndGo = {
  'id' : 'addTextAndGo',
  'title' : 'Add Text and Go',
  'contexts' : ['selection']
}


chrome.contextMenus.create(contextMenuItemAddText);
chrome.contextMenus.create(contextMenuItemAddTextAndGo);

chrome.contextMenus.onClicked.addListener(function(clickData){
  if (clickData.selectionText){
    var selectionText = clickData.selectionText;
    var selectionSourceUrl = clickData.pageUrl;

    if (clickData.menuItemId == 'addTextFromSelection') {
      updateText(selectionText, selectionSourceUrl);
      chrome.storage.local.set({'poem' : ' '}); // resets poem
    } else if (clickData.menuItemId == 'addTextAndGo'){
      updateText(selectionText, selectionSourceUrl);
      chrome.storage.local.set({'poem' : ' '}); // resets poem
      window.open('options.html');
    };
  };
});


function updateText(selectionText, selectionSourceUrl){
  chrome.storage.local.get('text', function(verseText){
    var newText = '';

    if (verseText.text != undefined){
      newText += String(verseText.text);
    };

    var newTextGroup = `
    <div class="verseTextGroup" id="source-${selectionSourceUrl}">
      <p class="verseText">${selectionText}</p>
      <p class="textSource">Source: <a href="${selectionSourceUrl}"  target=”_blank”>${selectionSourceUrl}</a></p>
    </div>
    `
    newText += newTextGroup;
    // console.log(newText + " 2")
    chrome.storage.local.set({'text': newText });
  })
};
