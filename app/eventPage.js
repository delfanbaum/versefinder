var contextMenuItemAddText = {
    "id" : "addTextFromSelection",
    "title" : "Add Selection",
    "contexts" : ["selection"]
};
var contextMenuItemAddTextAndGo = {
  'id' : 'addTextAndGo',
  'title' : 'Add Selection and Go',
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
    } else if (clickData.menuItemId == 'addTextAndGo'){
      updateText(selectionText, selectionSourceUrl);
      window.open('options.html');
    };
  };
});


function updateText(selectionText, selectionSourceUrl){
  chrome.storage.sync.get('text', function(verseText){
    var newText = '';

    if (verseText){
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
    chrome.storage.sync.set({'text': newText });
  })
};
