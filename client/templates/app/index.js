Template.index.helpers({
  lists: function(){
    return Lists.find({author: Meteor.userId()});
  }
});

Template.index.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });
});
