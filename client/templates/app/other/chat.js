Template.chat.helpers({
  chatPoints: function(){
    return Points.find({}, {sort: {createdAt: -1}});
  }
});

Template.chat.onCreated(function() {
  var self = this;
  var ids = FlowRouter.getQueryParam('anchor').split(',');
  self.autorun(function() {
    self.subscribe('chat', ids);
  });
});
