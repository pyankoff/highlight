Template.dashboard.events({
  "mouseup p": function(e){
    var selection = window.getSelection(),
        text = selection.toString(),
        start = selection.getRangeAt(0).startOffset;

    var regex = new RegExp(text, "gi");

    e.target.innerHTML = e.target.innerHTML.replace(text,
            "<span class='highlight'>" +
            text +
            "</span>");
  }
});
