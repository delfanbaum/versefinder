///import html2canvas from 'html2canvas.min.js';

function getSaveState(){
  chrome.storage.local.get(['text', 'poem', 'eraseColor', 'textColor'],function(verseText){
    var textField = document.getElementById('verseTextField');
    if (verseText.poem != ' ') {
      textField.innerHTML = verseText.poem;
      addListeners(textField);
      listenSaveState();
    } else if (verseText.text != ' '){
      var textField = document.getElementById('verseTextField');
      textField.innerHTML = verseText.text;
    } else {
      textField.innerHTML = `<p>Add text from the web to get started.</p>`
    };
    if (verseText.eraseColor){
      console.log('there was an erasure color');
      var s = document.createElement('style');
      s.innerHTML = `.toggle {background: ${verseText.eraseColor}}
      .color-picker-button {background: ${verseText.eraseColor}}`;
      var head = document.querySelector('head');
      head.appendChild(s);
    }
    if (verseText.textColor){
      console.log('there was an erasure text color');
      var sa = document.createElement('style');
      sa.innerHTML = `.toggle {color: ${verseText.textColor}}
      .text-picker-button {background: ${verseText.textColor}}`;
      var head = document.querySelector('head');
      head.appendChild(sa);
    }
  });
  // wait
  setTimeout(function(){
    var unbreaks = document.querySelectorAll('.unbreakContainer');
    if (unbreaks) {
      for (var u = 0; u < unbreaks.length; u++) {
        var e = unbreaks[u].id.slice(1,);
        console.log(e)
        unbreaks[u].addEventListener('click', function(){
            var a = event.currentTarget.id;
            var b =  a.slice(1,);
            var c = document.getElementById(b);
            document.getElementById(a).outerHTML = "";
            c.setAttribute('class', 'lineBreak');
          });
        console.log('undo line break listener added');
      }
    };
  }, 100);

};


window.onload = getSaveState();

function listenSaveState(){
  console.log('Listening to save state.')
  var newErasure = document.getElementById('verseTextField');
  newErasure.addEventListener('click', function(){
    chrome.storage.local.set({'poem': newErasure.innerHTML });
  });
  var titleChange = document.getElementById('poemTitle');
  titleChange.addEventListener('input', function(){
    console.log('Title change!')
    chrome.storage.local.set({'poem': newErasure.innerHTML });
  })
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
  // color clears
  chrome.storage.local.set({'textColor': 'black' });
  chrome.storage.local.set({'eraseColor': 'black' });
  var sa = document.createElement('style');
  sa.innerHTML = `
  .toggle {color: #000; background: #000}
  .color-picker-button {background: #000}
  .text-picker-button {background: #000}`;
  var head = document.querySelector('head');
  head.appendChild(sa);

  console.log('Stopped listening to save state.')
};

var resetStorage = document.getElementById("resetStorage");
resetStorage.onclick = function() {
  chrome.storage.local.set({'text': ' ' });
  chrome.storage.local.set({'poem': ' ' });
  chrome.storage.local.set({'textColor': 'black' });
  chrome.storage.local.set({'eraseColor': 'black' });
  var textField = document.getElementById('verseTextField');
  textField.innerHTML = `<p>Add text from the web to get started.</p>`;

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
  if (document.getElementById('verseTextField').innerHTML === `<p>Add text from the web to get started.</p>`) {
    console.log('Need to add text before start does anything')
    alert('You need to add some text first!')
  } else {
    if (document.getElementById('poemTitle')) {
      console.log('Title exists.')
    } else {
      addTitleArea();
    }
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
  }
};

// canvas for export ...?
shareButton = document.getElementById('share');
poemToShare = document.getElementById('verseTextContainer');

shareButton.onclick = function(){
  addWatermark();
  var cover = document.createElement('div');
  cover.setAttribute('id', 'cover');
  cover.innerHTML = '&nbsp;';
  document.body.appendChild(cover);

  html2canvas(document.querySelector("#verseTextContainer")).then(canvas => {


    canvas.setAttribute('class','exportImage');
    instructions = document.createElement('div');
    instructions.setAttribute('class', 'instructions');
    instructions.innerHTML = `<p>Right-click the image of your poem to save and share!</p>`

    exit = document.createElement('div');
    exit.setAttribute('id', 'exit')
    exit.innerHTML = `<p><a href="options.html" id="clearShare">&#215;</a></p>`


    cover.appendChild(canvas);
    cover.appendChild(instructions);
    cover.appendChild(exit);

});
};

function addWatermark(){
  watermark = document.createElement('div');
  watermark.setAttribute('id', 'watermark');
  watermark.innerHTML = `<p>Made with<span><strong><em>V</em></strong>ersefinder</span></p>`

  container = document.getElementById('verseTextContainer');
  container.appendChild(watermark);

}
