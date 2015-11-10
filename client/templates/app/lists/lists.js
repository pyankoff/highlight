Template.lists.helpers({
  lists: function(){
    return Lists.find({author: Meteor.userId()}, {sort: {updatedAt: -1}});
  }
});

Template.lists.events({
  "click .new-chat": function(e){
     var id = Lists.insert({
       text: 'New list',
       author: Meteor.userId(),
       points: [],
       updatedAt: new Date()
     });
     FlowRouter.go('list', {id: id});
  }
});

Template.lists.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('lists');
  });
});
