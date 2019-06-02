var submit = document.getElementById("manualAddText");

submit.onclick = function() {
  var test = "no, no";
  var button = document.createElement("p");
  button.innerHTML = 'no';
  document.getElementById('verseText').appendChild(button)


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
