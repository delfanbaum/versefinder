var contextMenuItem = {
    "id" : "addText",
    "title" : "Text to verse",
    "contexts" : ["selection"]
};

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
   if (clickData.menuItemId == "spendMoney" && clickData.selectionText){
     chrome.storage.sync.get('text', function(verseText){
       var newText = '';

       console.log(newText + " 0")

       if (verseText){
         newText += String(verseText.text);
       };

       console.log(newText + " 1")

       var inputText = document.getElementById("manualText").value;

       if (inputText){
         if (inputText[0] != ' '){
           newText += ' ' + inputText;
         } else {
           newText += inputText;
         }
       };

       console.log(newText + " 2")

       chrome.storage.sync.set({'text': newText });
     });
  }});
