function addListeners(text) { // text now refers to containing parentNode
  console.log(text)

  text.addEventListener("click", function(button){
    if (button.target && button.target.nodeName == "BUTTON") {
      console.log("button click on " + button.target.id + "!");
      toggle(button.target.id)
    }
  });

};

text = document.getElementById('thetext');

function run(){
  addListeners(text);
};

function toggle(elementID){
  var element = document.getElementById(elementID);
  if (element.classList.contains("toggle")){
    element.classList.remove("toggle");
  } else {
    element.classList.add("toggle");
  }
}
