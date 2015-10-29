Template.listPage.helpers({
  listPoints: function(){
    var id = FlowRouter.getParam('id'),
        list = Lists.findOne(id),
        pointIds = _.pluck(list.points, 'id');

    return Points.find({_id: {$in: pointIds}});
  }
});

Template.listPage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });
});
