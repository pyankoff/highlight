Meteor.publish("all", function(){
  return [Lists.find(),
          Points.find(),
          Clusters.find(),
          Tags.find(),
          Edges.find()];
});

Meteor.publish("lists", function(){
  return Lists.find();
});

Meteor.publishComposite('singleList', function(listId) {
  return {
    find: function() {
      return Lists.find({_id: listId});
    },
    children: [
      {
        find: function(list) {
          return Points.find({_id: {$in: list.points}});
        }
      }
    ]
  }  
});
