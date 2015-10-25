Template.essayItem.helpers({
  essayLink: (id) => {
    return FlowRouter.path('essay', {id: id});
  }
});
