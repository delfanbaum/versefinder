
function toggle(elementID){
  var element = document.getElementById(elementID);
  if (element.classList.contains("toggle")){
    element.classList.remove("toggle");
  } else {
    element.classList.add("toggle");
  }
};

function addLineBreak(lineBreakID) {
    console.log("Line break go!");
    console.log(lineBreakID);
    position = document.getElementById(lineBreakID);
    position.setAttribute('class', 'none')
    var lineBreakTag = document.createElement("span");
    lineBreakTag.setAttribute('class', 'unbreakContainer')
    lineBreakTag.setAttribute('id', 'u'+lineBreakID)
    lineBreakTag.innerHTML = `<br />
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        	 viewBox="0 0 20 20" class="unbreak" style="width:20px; height:20px;" xml:space="preserve">
        <style type="text/css">
        	.st0{fill:#FFFFFF;stroke:#000000;stroke-miterlimit:10;}
        	.st1{fill:none;stroke:#000000;stroke-miterlimit:10;}
        </style>
        <g>
        	<path class="st0 strokes" d="M5.5,3.8c0,0,0-6.1,0,4.9c0,9.7,7.5,9.9,8.7,9.8c0.1,0,4.5,0,4.5,0"/>
        	<polyline class="st1 strokes" points="9.9,5.6 5.5,2 1.1,5.6 	"/>
        </g>
        </svg>`
    console.log('add undo');
    position.parentNode.insertBefore(lineBreakTag, position.nextSibling);


    lineBreakTag.addEventListener('click', function(){
      console.log('clicked on un-line break')
      position.parentNode.removeChild(lineBreakTag);
      position.setAttribute('class', 'lineBreak');
  });
    console.log('undo line break listener added');
};

function textToErasable(text, groupNumber){ // where 'text' is a string
  var erasableText = '';
  if (document.querySelector('#punctuationSeperator').checked = true){
    console.log('separate punctuation!');
    text = separatePunctuation(text);
  }
  var t = text.split(' ');
  for (var i = 0; i < t.length; i++){
    if (t[i] == ''){
      console.log('We have got a space! No new button.')
    } else {
      var markup = `<button id="g-${groupNumber}-w-${i}">${t[i]}</button>
      <a class="lineBreak" id="g-${groupNumber}-w-${i}-br" href="#"> / </a>`
      erasableText += markup;
    }
  };
  return erasableText;
};

function addTitleArea() {
  container = document.getElementById('verseTextField');

  var titleField = document.createElement('div');
  titleField.setAttribute('id', 'poemTitle');
  titleField.innerHTML = `<span contenteditable="true">Enter a title...</span>`

  container.insertBefore(titleField, container.firstChild);
}

function separatePunctuation(text) { // I know there is a better way to do this.
  var t = text.replace(/[,]/g, ' ,')
  t = t.replace(/[;]/g, ' ;')
  t = t.replace(/[.]/g, ' .')
  t = t.replace(/["]/g, ' " ')
  t = t.replace(/[:]/g, ' :')
  t = t.replace(/[!]/g, ' !')
  t = t.replace(/[?]/g, ' ?')
  t = t.replace(/[\[]/g, ' [')
  t = t.replace(/[\]]/g, ' ]')
  return t
}

// colopicker options

var elem = document.querySelector('.color-picker-button');
var eraseColorPicker = new Huebee( elem, {
  // options
  setText: false,
  saturations: 2,
  hues: 6,
  shades:5,
  //staticOpen: 'true'
});

eraseColorPicker.on('change', function( color, hue, sat, lum){
  console.log ('erase color changed to: ' + color)
// this is probably a shitty way to do this, but --
    var style = document.createElement('style');
    style.innerHTML = `.toggle {background: ${color}}`;
    var head = document.querySelector('head');
    head.appendChild(style);


// save state
  chrome.storage.local.set({'eraseColor': color});

})

// this could be condensed with above, but for now:

var elem = document.querySelector('.text-picker-button');
var textColorPicker = new Huebee( elem, {
  // options
  setText: false,
  saturations: 2,
  hues: 6,
  shades:5,
  //staticOpen: 'true'
});

textColorPicker.on('change', function( color, hue, sat, lum){
  console.log ('text color changed to: ' + color)
// this is probably a shitty way to do this, but --
    var style = document.createElement('style');
    style.innerHTML = `.toggle {color: ${color}}`;
    var head = document.querySelector('head');
    head.appendChild(style);

// save state
  chrome.storage.local.set({'textColor': color});
  console.log('storage set');
})
