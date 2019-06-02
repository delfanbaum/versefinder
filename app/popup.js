var submit = document.getElementById("manualAddText");

submit.onclick = function() {
  var value = document.getElementById("manualText").value;
  var textField = document.getElementById('verseTextField');
  textField.innerHTML = value;

  //clear text field
  document.getElementById("manualText").value = "";

};

//
// chrome.storage.sync.get('text', function(verseText){
//     var newText = "";
//     if (verseText.text){
//       newText += verseText.text
//     }
//
//     var addText = document.getElementById('manualAdd').value;
//
//     if (addText){
//       newText += addText;
//     }
//     chrome.storage.sync.set({'text': newText})
//
//     document.getElementById("manualAddText").value = '';
//
//     var pageText = document.getElementById('verseText');
//     pageText.appendChild(newText);
//
//
//
// });
//
