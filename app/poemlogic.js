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
}

function addLineBreak(position) {
    console.log("Line break go!")
    var lineBreakTag = document.createElement("br");
    position.parentNode.insertBefore(lineBreakTag, position.nextSibling);
    position.parentNode.removeChild(position);
    //lineBreakTag.setAttribute('class', 'lineBroken')
    //lineBreakTag.setAttribute('onclick', 'unbreakline()')

}

function toggleWord(word){
    console.log("toggleWord " + word + " clicked!")
    wordelement = document.getElementById(word);
    if (wordelement.hasAttribute('class')) {
            wordelement.removeAttribute('class');
        }
    else {
        wordelement.setAttribute('class', 'erased')
    }
}

function textToButtons(text) {
    var i;
    for (i = 0; i < text.length; i++) {
        if (text[i] === "") {
            console.log("This is a space!")
        }
        else {
            console.log(text[i]);
            // 1. Create the button
            var button = document.createElement("button");
            button.innerHTML = text[i];
            button.setAttribute('id',("word" + i));
            //button.setAttribute('onclick', ('toggleWord('+("word" + i)+')'));


            // create the line-break option
            var lineBreak = document.createElement("button");
            lineBreak.setAttribute('class', 'lineBreak');
            lineBreak.setAttribute('id',("lineBreak" + i));
            lineBreak.setAttribute('onclick', ('addLineBreak('+("lineBreak" + i)+')'));
            lineBreak.innerHTML = " / "

            // 2. Append somewhere
            document.getElementById("thetext").appendChild(button);
            document.getElementById("thetext").appendChild(lineBreak);



    }}

}

function addListeners(text) {
  for (i = 0; i < text.length; i++) {
    // add onclick
    document.getElementById("word" + i).addEventListener(("click " + i), toggleWord("word" + i));
    console.log("added listener" + " " + i)
  }
}

function run() {
    var a, b;
    a = getSelectionText()
    b = a.split(" ")
    textToButtons(b)
}

gobutton = document.getElementById('go');

gobutton.onclick = function() {
  text = document.getElementById('verseTextField').innerText;
  text = text.split(' ')
  poemfield = document.getElementById('thetext');
  textToButtons(text);
  addListeners(text);
}
