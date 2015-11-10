Meteor.publishComposite('chat', function(anchor) {
  return {
    find: function() {
      if (Points.findOne(anchor)) {
        return Points.find(anchor);
      }
      if (Lists.findOne(anchor)) {
        return Lists.find(anchor);
      }
    },
    children: [
      {
        find: function(item) {
          if (Points.findOne(anchor)) {
            return Edges.find({
              points: item._id
            });
          }
          if (Lists.findOne(anchor)) {
            return Edges.find({$or: [{
                points: item._id
              }, {
                points: {$in: item.points}
              }]
            });
          }
        },
        children: [
          {
            find: function(edge, item) {
              return Points.find({_id: {$in: edge.points}});
            }
          }
        ]
      }
    ]
  }
});

Meteor.publish("lists", function(){
  return Lists.find({}, {limit: 20});
});

Meteor.publishComposite('singleList', function(listId) {
  return {
    find: function() {
      return Lists.find({_id: listId});
    },
    children: [
      {
        find: function(list) {
          var pointIds = list.points.map(p => p.id)
          return Points.find({_id: {$in: pointIds}});
        }
      }
    ]
  }
});

Meteor.publish('all', function(){
  return [Wiki.find({type: 'page'}, {limit: 3}), Points.find(), Lists.find(), Edges.find()];
});
