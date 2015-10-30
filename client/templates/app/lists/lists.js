Template.lists.helpers({
  lists: function(){
    return Lists.find({author: Meteor.userId()});
  },
  listLink: function() {
    return FlowRouter.path('list', {id: this._id});
  }
});

Template.lists.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });
});
