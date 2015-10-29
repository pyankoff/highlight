Meteor.publish("all", function(){
  return [Lists.find(),
          Points.find(),
          Clusters.find(),
          Tags.find(),
          Edges.find()];
});
