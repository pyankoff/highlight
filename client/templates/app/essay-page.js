Template.essayPage.helpers({
  essay: function(){
    var id = FlowRouter.getParam('id');
    return Essays.findOne(id);
  }
});

Template.essayPage.events({
  "mouseup .essay": function(e, tmp) {
    var text = rangy.getSelection().toString();
    var popover = $('.add-point');

    popover.hide();
    $('#tagSelect')[0].selectize.clear();

    if (text.length > 0) {
      popover.css({ top: e.pageY, left: e.pageX });
      popover.show();

      var essayId = this._id;
          author = this.author;

      var point = {
        text: text,
        source: essayId,
        author: author
      };

      Meteor.call("newPoint", point, function(error, result){
        if(error){
          console.log("error", error);
        }
        if(result){
          highlighter.classAppliers.highlight.elementProperties.href = "/point/"+result;
          highlighter.highlightSelection("highlight");
          Session.set('pointId', result);
        }
      });
    }
  }
});

Template.essayPage.onRendered(function() {
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

  var fromPoint = FlowRouter.getQueryParam('point');
  if (fromPoint) {
    var place = 'a[href="'+FlowRouter.path('point', {id: fromPoint})+'"]';
    Meteor.setTimeout(function(){
      $.scrollTo(place, 300, {offset:-50});
      $(place).delay(300).effect("highlight", {}, 2000);
    }, 300);
  }
});

Template.essayPage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });
});
