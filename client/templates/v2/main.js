Template.main.helpers({
  points: function(){
    return Points.find({}, {sort: {updatedAt: -1}});
  }
});

Template.main.events({
  'keypress input.recipe-input': function (e) {
    if (e.which === 13) {
      Session.set('recipe', e.target.value);
    }
  }
});

Template.main.onCreated(function() {
  var self = this;

  self.autorun(function() {
    var recipe = Session.get('recipe');
    self.subscribe('recipe', recipe);
  });
});
