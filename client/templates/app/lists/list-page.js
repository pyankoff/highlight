Template.listPage.helpers({
  listPoints: function(){
    var id = FlowRouter.getParam('id'),
        list = Lists.findOne(id),
        pointIds = _.pluck(list.points, 'id');
    Session.set("listId", id);

    var points = Points.find({_id: {$in: pointIds}}).fetch();
    points = _.sortBy(points, function(doc) {
      return pointIds.indexOf(doc._id)
    });
    return points;
  }
});

Template.listPage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });
});
