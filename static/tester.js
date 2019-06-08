function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}

function getSelectionLocation() {
  var text = "";
  if (window.getSelection) {
      text = window.getSelection()
  }
  return text;
}

function unbreakline()  {
    // do something
}

function addLineBreak(position) {
    console.log("Line break go!")
    var lineBreakTag = document.createElement("br");
    position.parentNode.insertBefore(lineBreakTag, position.nextSibling);
    position.parentNode.removeChild(position);
    lineBreakTag.setAttribute('class', 'lineBroken')
    lineBreakTag.setAttribute('onclick', 'unbreakline()')

}

function toggleWord(word){
    console.log("toggleWord clicked!")
    if (word.hasAttribute('class')) {
            word.removeAttribute('class');
        }
    else {
        word.setAttribute('class', 'erased')
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
            button.setAttribute('onclick', ('toggleWord('+("word" + i)+')'));

            // create the line-break option
            var lineBreak = document.createElement("button");
            lineBreak.setAttribute('class', 'lineBreak');
            lineBreak.setAttribute('id',("lineBreak" + i));
            lineBreak.setAttribute('onclick', ('addLineBreak('+("lineBreak" + i)+')'));
            lineBreak.innerHTML = " / "

            // 2. Append somewhere
            document.getElementById("thetext").appendChild(button);
            document.getElementById("thetext").appendChild(lineBreak);
            // 3. Add event handler
            button.addEventListener ("click", function() {
              console.log("the number of this is" + i)
            });
    }}
}


function run() {
    var a, b;
    a = getSelectionText()
    b = a.split(" ")
    textToButtons(b)
}


// new erase tester

var eraseButton = document.getElementById('eraseSelection');

eraseButton.onclick = function() {
  var text = getSelectionLocation();
  console.log(text);
  var pagetext = document.getElementById('loremtext').textContent;
  console.log(pagetext);
  var start = parseInt(text.anchorOffset);
  var end = parseInt(text.focusOffset);
  console.log(pagetext.slice(start,end));
  var selection = pagetext.slice(start,end);
  pagetext.replace(selection,('<span class="erased2">'+selection+'</span>'))
}
