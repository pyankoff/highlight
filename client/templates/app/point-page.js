FlowRouterAutoscroll.animationDuration = 0;

Template.pointPage.helpers({
  point: function(){
    var id = FlowRouter.getParam('id');
    return Points.findOne(id);
  },
  related: function () {
    var id = FlowRouter.getParam('id');

    var related = [];
    Edges.find({points: id, author: Meteor.userId()}).forEach((edge) => {
      related.push(_.without(edge.points, id)[0]);
    });

    return Points.find({_id: {$in: related}});
  },
  suggested: function () {
    var id = FlowRouter.getParam('id');
    var targets = Points.findOne(id).targets;

    var suggested = [];
    for (var i = 0; i < targets.length; i++) {
      suggested[targets[i].id] = targets[i].weight;
    }

    suggested = Points.find({"_id": {$in: _.keys(suggested)}}).map((point) => {
      point.weight = suggested[point._id];
      return point;
    });
    
    return _.sortBy(suggested, 'weight').reverse()
  }
});

Template.pointPage.events({
  "submit .point-input": function(e, template){
    e.preventDefault();

    var point = {
      text: e.target.text.value
    };
    var related = FlowRouter.getParam('id')

    Meteor.call("submitPoint", point, related, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        var place = 'a[href="'+FlowRouter.path('point', {id: result})+'"]'

        Meteor.setTimeout(function(){
          $.scrollTo(place, 300, {offset: -50});
          $(place).delay(300).effect("highlight", {}, 2000);
        }, 0);

      }
    });

    e.target.reset();
  }
});


Template.pointPage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });
});
