// basically I need to remove all inline script functions because Chrome.
// TODO. Probably need to re-write this from scratch.

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

function toggle(elementID){
  var element = document.getElementById(elementID);
  if (element.classList.contains("toggle")){
    element.classList.remove("toggle");
  } else {
    element.classList.add("toggle");
  }
};

gobutton = document.getElementById('go');

gobutton.onclick = function() {
  var textsContainer = document.getElementById('verseTextField');
  var verseContainers = textsContainer.getElementsByClassName("verseText");
  for (var i = 0; i < verseContainers.length; i++){
    var text = textsContainer.getElementsByClassName("verseText")[i].innerHTML;
    textsContainer.getElementsByClassName("verseText")[i].innerHTML = textToErasable(text, i);
    addListeners(verseContainers[i]);
    console.log('here')
  };
};

function textToErasable(text, groupNumber){ // where 'text' is a string
  var erasableText = '';
  var t = text.split(' ');
  for (var i = 0; i < t.length; i++){
    var markup = `<button id="g-${groupNumber}-w-${i}">${t[i]}</button>
    <a class="lineBreak" id="g-${groupNumber}-w-${i}-br" href="#"> / </a>`
    erasableText += markup;
    console.log(t[i] + 'through')
  };
  console.log(erasableText);
  return erasableText;
};
