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
  };
});

Template.essayPage.helpers({
  essay: function(){
    var id = FlowRouter.getParam('id'),
        essay = Essays.findOne(id);

    if (true) {
      var annotatedText = '';
      var cursor = 0;
      for (var i = 0; i < essay.points.length; i++) {
        var range = essay.points[i].range,
            pointId = essay.points[i].id;

        annotatedText += essay.text.substring(cursor, range.start)
                      + '<a href="'
                      + FlowRouter.path('point', {id: pointId})
                      + '" class="highlight">'
                      + essay.text.substring(range.start, range.end)
                      + '</a>';

        cursor = range.end;
      };
      annotatedText += essay.text.substring(cursor);
      essay.annotatedText = annotatedText;
    } else {
      essay.annotatedText = essay.annotatedHtml;
    }

    return essay;
  }
});

Template.essayPage.events({
  "mouseup .essay": function(e, tmp) {
    var selection = rangy.getSelection();
    var text = selection.toString();
    var popover = $('.add-point');


    var range = selection.getRangeAt(0).toCharacterRange($('.essay')[0]);
    var newLineCorrection = (this.text.substring(0, range.start)
                              .match(/\n\n/g) || []).length;
        newLineCorrection = (this.text.substring(0, range.start+newLineCorrection)
                              .match(/\n\n/g) || []).length;

    range.start = range.start + newLineCorrection;
    range.end = range.end + newLineCorrection;

    popover.hide();
    $('#tagSelect')[0].selectize.clear();

    if (text.length > 0) {
      var point = Points.findOne({text: text});

      if (point) {
        console.log(point._id);
        Essays.update({_id: this._id}, {$addToSet:{
          points: {
            id: point._id,
            text: text,
            range: range
          }
        }});
      }
      // popover.css({ top: e.pageY, left: e.pageX });
      // popover.show();
      //
      // var essayId = this._id;
      //     author = this.author;
      //
      // var point = {
      //   text: text,
      //   source: essayId,
      //   author: author
      // };
      //
      // Meteor.call("newPoint", point, function(error, result){
      //   if(error){
      //     console.log("error", error);
      //   }
      //   if(result){
      //     highlighter.classAppliers.highlight.elementProperties.href = "/point/"+result;
      //     highlighter.highlightSelection("highlight");
      //     Session.set('pointId', result);
      //   }
      // });
    }
  }
});

Template.essayPage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });
});
