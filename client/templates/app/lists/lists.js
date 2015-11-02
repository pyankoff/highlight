Template.lists.helpers({
  lists: function(){
    return Lists.find({author: Meteor.userId()}, {sort: {updatedAt: -1}});
  },
  listLink: function() {
    return FlowRouter.path('list', {id: this._id});
  },
  pointCount: function() {
    return this.points.length;
  }
});

Template.lists.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('lists');
  });
});
