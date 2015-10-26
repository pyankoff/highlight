Meteor.publish("all", function(){
  return [Essays.find(),
          Points.find(),
          Tags.find()];
});
