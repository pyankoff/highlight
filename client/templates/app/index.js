Template.index.helpers({
  essay: function(){
    return Essays.findOne({});
  }
});

Template.index.events({
  "mouseup .essay": (e) => {
    var text = rangy.getSelection().toString();
    var essayId = Essays.findOne({})._id;

    if (text.length > 0) {
      var point = {
        text: text,
        source: essayId
      }

      Meteor.call("newPoint", point, function(error, result){
        if(error){
          console.log("error", error);
        }
        if(result){
          highlighter.classAppliers.highlight.elementProperties.href = "/point/"+result;
          highlighter.highlightSelection("highlight");

          var text = e.currentTarget.innerHTML.toString();
          console.log(essayId, text);
          Meteor.call("updateEssay", essayId, text);
        }
      });
    }
  }
});

Template.index.onRendered(function() {
  rangy.init();
  highlighter = rangy.createHighlighter();

  var classApplier = rangy.createClassApplier("highlight", {
      ignoreWhiteSpace: true,
      elementTagName: "a",
      elementProperties: {
          href: "#"
      }
  });
  highlighter.addClassApplier(classApplier);
});

Template.index.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });
});
