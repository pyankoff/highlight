Template.index.helpers({
  essay: function(){
    return Essays.findOne({});
  }
});

Template.index.events({
  "mouseup .essay": function(e){
    var selection = window.getSelection(),
        text = selection.toString(),
        start = selection.getRangeAt(0).startOffset;
    console.log(window.getSelection());
    e.target.innerHTML = e.target.innerHTML.replace(text,
            "<span class='highlight'>" +
            text +
            "</span>");
  }
});

Template.index.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });
});
