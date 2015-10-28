Meteor.publish("all", function(){
  return [Essays.find(),
          Points.find(),
          Clusters.find(),
          Tags.find(),
          Edges.find()];
});
