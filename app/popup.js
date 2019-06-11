function getStoredText(){
  chrome.storage.sync.get(['text'],function(verseText){
    var textField = document.getElementById('verseTextField');
    textField.innerHTML = verseText.text;
  });
};

window.onload = getStoredText();
/*
var submit = document.getElementById("manualAddText");

submit.onclick = function() {

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

    // set the language to whatever
    var textField = document.getElementById('verseTextField');
    textField.innerHTML = newText;

    //

    //clear text field
    document.getElementById("manualText").value = '';

  });

}; */

var reset = document.getElementById("resetStorage");
reset.onclick = function() {
  chrome.storage.sync.set({'text': ' ' });
  var textField = document.getElementById('verseTextContainer');
  textField.classList.add('none');

};
