Template.pointPage.helpers({
  point: function(){
    var id = FlowRouter.getParam('id');
    return Points.findOne(id);
  }
});


Template.pointPage.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });
});
