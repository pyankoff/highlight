Template.lists.helpers({
  lists: function(){
    return Lists.find({author: Meteor.userId()}, {sort: {updatedAt: -1}});
  }
});

Template.lists.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('lists');
  });
});
