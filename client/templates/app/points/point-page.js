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
    var edges = Edges.find({points: id}).fetch();

    if (edges) {
      var suggested = [];
      for (var i = 0; i < edges.length; i++) {
        var relatedPoint = _.without(edges[i].points, id)[0];
        suggested[relatedPoint] = edges[i].weight;
      }

      suggested = Points.find({"_id": {$in: _.keys(suggested)}}).map((point) => {
        point.weight = suggested[point._id];
        return point;
      });

      return _.sortBy(suggested, 'weight').reverse()
    }
  }
});

Template.pointPage.events({
  "click .point-item": function(e){
    if (!$(e.target).hasClass('fa') &&
        !$(e.target).hasClass('btn') &&
        !$(e.target).hasClass('selectize-input') &&
        !$(e.target).is('input')) {

      e.stopImmediatePropagation();
      Session.set('connectTo', undefined);
      FlowRouter.go('point', {id: this._id});
    }
  },
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
