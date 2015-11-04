Template.chat.helpers({
  chatPoints: function(){
    return Points.find({}, {sort: {createdAt: 1}});
  }
});

Template.chat.events({
  "click .fa-reply": function(e) {
    if (Meteor.user()) {
      Session.set('replyTo', this._id);
    } else {
      FlowRouter.go('atSignIn');
    }
  }
});

Template.chat.onCreated(function() {
  var self = this;
  self.autorun(function() {
    FlowRouter.watchPathChange();
    var anchor = FlowRouter.getQueryParam('anchor');
    self.subscribe('chat', anchor);
  });
});
