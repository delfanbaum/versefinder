function getStoredText(){
  chrome.storage.sync.get(['text'],function(verseText){
    var textField = document.getElementById('verseTextField');
    textField.innerHTML = verseText.text;
  });
};

window.onload = getStoredText();


var submit = document.getElementById("manualAddText");

submit.onclick = function() {

  chrome.storage.sync.get('text', function(verseText){
    var newText = '';
    if (verseText === 'string'){
      newText += String(verseText);
    };

    var inputText = document.getElementById("manualText").value;

    if (inputText){
      newText += String(inputText);
    };


    chrome.storage.sync.set({'text': newText});

    // set the language to whatever
    var textField = document.getElementById('verseTextField');
    textField.innerHTML = newText;

    //

    //clear text field
    document.getElementById("manualText").value = '';

  });

};
