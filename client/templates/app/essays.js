Template.essays.helpers({
  essays: () => {
    return Lists.find();
  },
  essayLink: function(id) {
    return FlowRouter.path('essay', {id: this._id});
  }
});

Template.essays.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });
});
