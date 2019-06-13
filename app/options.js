function getStoredText(){
  chrome.storage.sync.get(['text', 'poem'],function(verseText){
    if (verseText.poem) {
      var textField = document.getElementById('verseTextField');
      textField.innerHTML = verseText.poem;
      addListeners(textField);
      listenSaveState();
    } else {
      var textField = document.getElementById('verseTextField');
      textField.innerHTML = verseText.text;
    }
  });
};

window.onload = getStoredText();

function listenSaveState(){
  var newErasure = document.getElementById('verseTextField');
  newErasure.addEventListener('click', function(){
    chrome.storage.sync.set({'poem': verseTextField.innerHTML });
  });
};

var resetPoem = document.getElementById('resetPoem');
resetPoem.onclick = function() {
  chrome.storage.sync.set({poem: ''});
  chrome.storage.sync.get(['text'],function(verseText){
    var textField = document.getElementById('verseTextField');
    textField.innerHTML = verseText.text;
  });
  var poemListen = document.getElementById('verseTextField');
  poemListen.removeEventListener('click', function(){
    chrome.storage.sync.set({'poem': verseTextField.innerHTML });
  });
};

var resetStorage = document.getElementById("resetStorage");
resetStorage.onclick = function() {
  chrome.storage.sync.set({'text': ' ' });
  var textField = document.getElementById('verseTextContainer');
  textField.classList.add('none');

};

function addListeners(text) { // text now refers to containing parentNode
  //console.log(text)
  text.addEventListener("click", function(button) {
    if (button.target && button.target.nodeName == 'A') {
      console.log("line break at " + button.target.id + "!");
      addLineBreak(button.target.id);
    } else if (button.target && button.target.nodeName == "BUTTON") {
      console.log("button click on " + button.target.id + "!");
      toggle(button.target.id)
    }
  });
};

// does stuff

gobutton = document.getElementById('go');
gobutton.onclick = runThrough();


function runThrough() {
  var textsContainer = document.getElementById('verseTextField');
  var verseContainers = textsContainer.getElementsByClassName("verseText");
  for (var i = 0; i < verseContainers.length; i++){
    if (verseContainers[i].classList.contains('completed')){ // if it's already been made into buttons
      console.log("This one's already been turned into buttons!")
    } else {
      var text = textsContainer.getElementsByClassName("verseText")[i].innerHTML;
      textsContainer.getElementsByClassName("verseText")[i].innerHTML = textToErasable(text, i);
      addListeners(verseContainers[i]);
      textsContainer.getElementsByClassName("verseText")[i].classList.add('completed');
    }
  };
  listenSaveState();
};
