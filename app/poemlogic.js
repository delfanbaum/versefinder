
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
  var t = text.split(' ');
  for (var i = 0; i < t.length; i++){
    var markup = `<button id="g-${groupNumber}-w-${i}">${t[i]}</button>
    <a class="lineBreak" id="g-${groupNumber}-w-${i}-br" href="#"> / </a>`
    erasableText += markup;
    //console.log(t[i] + 'through')
  };
  //console.log(erasableText);
  return erasableText;
};
