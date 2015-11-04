Meteor.publish("chat", function(ids){
  var points = _.clone(ids);
  for (var i = 0; i < ids.length; i++) {
    Edges.find({points: ids[i]}).forEach(function(edge) {
      var connected = _.without(edge.points, ids[i])[0];
      if (!_.contains(points, connected)) {
        points.push(connected);
      }
    });
  }
  
  return Points.find({_id: {$in: points}});
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
