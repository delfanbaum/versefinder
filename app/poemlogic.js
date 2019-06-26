
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
    var lineBreakTag = document.createElement("br");
    position.parentNode.insertBefore(lineBreakTag, position.nextSibling);
    position.parentNode.removeChild(position);

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
