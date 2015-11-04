Meteor.publishComposite('chat', function(anchor) {
  return {
    find: function() {
      if (Points.findOne(anchor)) {
        return Points.find(anchor);
      }
      if (Lists.findOne(anchor)) {
        var list = Lists.findOne(anchor);
        return Points.find({_id: {$in: list.points}});
      }
    },
    children: [
      {
        find: function(point) {
          return Edges.find({$or: [{
              points: point._id
            },
            {
              points: anchor
            }]
          });
        },
        children: [
          {
            find: function(edge, point) {
              var connected = _.without(edge.points, point._id);
              connected = _.without(connected, anchor)[0];

              return Points.find({_id: connected});
            }
          }
        ]
      }
    ]
  }
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
