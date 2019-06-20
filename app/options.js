///import html2canvas from 'html2canvas.min.js';

function getStoredText(){
  chrome.storage.local.get(['text', 'poem'],function(verseText){
    if (verseText.poem != ' ') {
      var textField = document.getElementById('verseTextField');
      textField.innerHTML = verseText.poem;
      addListeners(textField);
      listenSaveState();
    } else if (verseText.text != ' '){
      var textField = document.getElementById('verseTextField');
      textField.innerHTML = verseText.text;
    } else {
      textField.innerHTML = '<p>Add text from the web!</p>'
    }
  });
};

window.onload = getStoredText();

function listenSaveState(){
  console.log('Listening to save state.')
  var newErasure = document.getElementById('verseTextField');
  newErasure.addEventListener('click', function(){
    chrome.storage.local.set({'poem': verseTextField.innerHTML });
  });
};

var resetPoem = document.getElementById('resetPoem');
resetPoem.onclick = function() {
  chrome.storage.local.set({'poem': ' '});
  chrome.storage.local.get(['text'],function(verseText){
    var textField = document.getElementById('verseTextField');
    textField.innerHTML = verseText.text;
  });
  var poemListen = document.getElementById('verseTextField');
  poemListen.removeEventListener('click', function(){
    chrome.storage.local.set({'poem': verseTextField.innerHTML });
  });
  console.log('Stopped listening to save state.')
};

var resetStorage = document.getElementById("resetStorage");
resetStorage.onclick = function() {
  chrome.storage.local.set({'text': ' ' });
  chrome.storage.local.set({'poem': ' ' });
  var textField = document.getElementById('verseTextField');
  textField.innerHTML = ' ';

};

function addListeners(text) { // text now refers to containing parentNode
  console.log('Listeners have been added to buttons and line breaks.')
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
gobutton.onclick = function(){
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

// canvas for export ...?
shareButton = document.getElementById('share');
poemToShare = document.getElementById('verseTextContainer');

shareButton.onclick = function(){
  var cover = document.createElement('div');
  cover.setAttribute('id', 'cover');
  cover.innerHTML = '&nbsp;';
  document.body.appendChild(cover);

  html2canvas(document.querySelector("#verseTextContainer")).then(canvas => {


    canvas.setAttribute('class','exportImage');
    instructions = document.createElement('div');
    instructions.setAttribute('class', 'instructions');
    instructions.innerHTML = `<p>Right-click the image of your poem and save to share!</p>`

    exit = document.createElement('div');
    exit.setAttribute('id', 'exit')
    exit.innerHTML = `<p><a href="options.html" id="clearShare">&#215;</a></p>`


    cover.appendChild(canvas);
    cover.appendChild(instructions);
    cover.appendChild(exit);

});
};
