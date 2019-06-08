// basically I need to remove all inline script functions because Chrome.
// TODO. Probably need to re-write this from scratch.

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    } else {
      text = document.getElementById('verseTextField').innerText;
    }
    return text;
};

function addLineBreak(lineBreakID) {
    console.log("Line break go!");
    console.log(lineBreakID);
    position = document.getElementById(lineBreakID);
    var lineBreakTag = document.createElement("br");
    position.parentNode.insertBefore(lineBreakTag, position.nextSibling);
    position.parentNode.removeChild(position);

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

function toggle(elementID){
  var element = document.getElementById(elementID);
  if (element.classList.contains("toggle")){
    element.classList.remove("toggle");
  } else {
    element.classList.add("toggle");
  }
};

function textToButtons(text){
 for (var i = 0; i < text.length; i++) {
     if (text[i] === "") {
         console.log("This is a space!")
     }
     else if (i < (text.length - 1)){
         console.log(text[i]);
         // texts to button
         var button = document.createElement("button");
         button.innerHTML = text[i];
         button.setAttribute('id',("word" + i));

        // add line break button
        var lineBreak = document.createElement("a");
        lineBreak.setAttribute('class', 'lineBreak');
        lineBreak.setAttribute('id',("lineBreak" + i));
        lineBreak.setAttribute('href', '#');
        lineBreak.innerHTML = " / "

         // add to doc
         document.getElementById("thetext").appendChild(button);
         document.getElementById("thetext").appendChild(lineBreak);

       }
     else {
       console.log('last word: ' + text[i]);
       // texts to button
       var button = document.createElement("button");
       button.innerHTML = text[i];
       button.setAttribute('id',("word" + i));

       // add to doc
       document.getElementById("thetext").appendChild(button);
     }
  }
};

gobutton = document.getElementById('go');

gobutton.onclick = function() {
  text = document.getElementById('verseTextField').innerText;
  text = text.split(' ')
  poemfield = document.getElementById('thetext');
  hideText();
  textToButtons(text);
  addListeners(poemfield);

};

function hideText(){
  savedText = document.getElementById('verseTextField');
  savedText.parentNode.removeChild(savedText);
};
