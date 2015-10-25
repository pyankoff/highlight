Template.index.helpers({
  essays: () => {
    return Essays.find();
  },
  essayLink: () => {
    return FlowRouter.path('essay', {id: this._id});
  }
});

Template.index.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });
});
