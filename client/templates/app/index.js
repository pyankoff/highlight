Template.index.helpers({
  points: function(){
    return Points.find({_id: {$in: Meteor.user().profile.points}});
  }
});

Template.index.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });
});
