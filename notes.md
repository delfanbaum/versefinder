Verse Finder Notes/Ideas
------------------------

## TODO
- rewrite textToButtons so that it preserves groups

## Bonus interactions
- create a slider option for the opacity of the "erased" words, from, say, 0 to 50. // options page
- remove line break! how to?
- maybe need to figure out how to make a line properly (e.g., paragraphs for lines? Or?)
--- create a new element that has a line break in it;
- context menu on select text would be super usefull... (done)

# Code Scraps

function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
