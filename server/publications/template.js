Meteor.publish("all", function(){
  return [Essays.find(),
          Points.find(),
          Clusters.find()];
});
