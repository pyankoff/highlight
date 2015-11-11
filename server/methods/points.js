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
      }});
    };

    Edges.insert({
      author: userId,
      points: [point.anchor, id]
    });

    return id;
  },
  exportPoints:function(fromList, toList, pointIds){
    Lists.update({_id: toList}, {$addToSet:{
      points: {$each: pointIds}
    }, $set: {
      updatedAt: new Date()
    }});
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
