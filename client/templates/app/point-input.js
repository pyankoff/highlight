

Template.pointInput.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });

  AutoForm.addHooks('newPointForm', {
    after: {
      method: function (error, result) {
        if (error) {
          console.log(error);
        };
        FlowRouter.go('point', {id: result});
      }
    }
  })
});
