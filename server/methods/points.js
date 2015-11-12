Meteor.methods({
  chatPoint: function(point) {
    var userId = Meteor.userId();
    var id = Points.insert({
      name: point.name,
      text: point.text,
      author: userId,
      createdAt: new Date()
    });

    if (point.toList) {
      Lists.update({_id: point.anchor}, {$addToSet:{
        points: {
          id: id,
          place: {x: 0.5, y: 0.5}
        }
      }, $set: {
        updatedAt: new Date()
      }});
    };

    Edges.insert({
      author: userId,
      points: [point.anchor, id]
    });

    return id;
  },
  exportPoints:function(fromList, pointIds){
    var list = Lists.findOne(fromList);
    var newPoints = _.filter(list.points, (x) => {
      return _.contains(pointIds, x.id);
    });
    var oldPoints = _.difference(list.points, newPoints);

    var id = Lists.insert({
      text: 'New list',
      author: Meteor.userId(),
      points: newPoints,
      updatedAt: new Date()
    });

    Lists.update({_id: fromList}, {$set: {
      points: oldPoints
    }});

    return id;
  },
  addToList:function(ids){
    var listId = ids.listId,
        pointId = ids.pointId;

    Lists.update({_id: listId}, {$addToSet:{
      points: pointId
    }, $set: {
      updatedAt: new Date()
    }});

    Meteor.users.update({_id: Meteor.userId()}, {$addToSet:{
      'profile.points': pointId
    }});
  },
  removeFromList:function(ids){
    var listId = ids.listId,
        pointId = ids.pointId;

    Lists.update({_id: listId}, {$pull:{
        points: {id: pointId}
    }});
  }
});
