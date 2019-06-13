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
   if (clickData.menuItemId == "addTextFromSelection" && clickData.selectionText){
     chrome.storage.sync.get('text', function(verseText){
       // get text and url
       var selectionText = clickData.selectionText;
       var selectionSourceUrl = clickData.pageUrl;
       // other stuff
       var newText = '';
       // console.log(newText + " 0")

       if (verseText){
         newText += String(verseText.text);
       };
       // console.log(newText + " 1")

       var newTextGroup = `
       <div class="verseTextGroup" id="source-${selectionSourceUrl}">
         <p class="verseText">${selectionText}</p>
         <p class="textSource">Source: <a href="${selectionSourceUrl}"  target=”_blank”>${selectionSourceUrl}</a></p>
       </div>
       `
       newText += newTextGroup;
       // console.log(newText + " 2")
       chrome.storage.sync.set({'text': newText });
     });
  } else if (clickData.menuItemId == "addTextAndGo" && clickData.selectionText) {
    window.open('options.html');
  }
});

function updateText(){

}
