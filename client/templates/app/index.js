Template.index.helpers({
  lists: function(){
    return Lists.find({author: Meteor.userId()});
  },
  listLink: function() {
    return FlowRouter.path('list', {id: this._id});
  }
});

Template.index.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });
});
