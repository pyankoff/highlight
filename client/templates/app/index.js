Template.index.helpers({
  essays: () => {
    return Essays.find();
  },
  essayLink: (id) => {
    return FlowRouter.path('essay', {id: id});
  }
});

Template.index.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });
});
