Meteor.methods({
  addToCart: function(id) {
    var userId = Meteor.userId();
     if (!_.contains(Meteor.user().profile.cart, id)) {
       Meteor.users.update({_id: userId}, {$addToSet:{
         "profile.cart": id
       }});
       Points.update({_id: id}, {$inc: {favCount: 1}});
     } else {
       Meteor.users.update({_id: userId}, {$pull:{
         "profile.cart": id
       }});
       Points.update({_id: id}, {$inc: {favCount: -1}});
     }
  },
  updateCart: function(cart) {
    var userId = Meteor.userId();
    Meteor.users.update({_id: userId}, {$set:{
      "profile.cart": cart
    }});
  },
  saveList: function(list) {
    var pointIds = list.points;
    list.points = _processPointIds(pointIds);

    if (!list.text) {
      list.text = String(pointIds.length)+ ' points';
    };

    var listId = _processList(list);

    return listId;
  },
  saveListInput: function(points) {
    var pointIds = [];
    for (var i = 0; i < points.length; i++) {
      var pointId = Points.insert({text: points[i]});
      pointIds.push({
        id: pointId
      });
    };

    var list = {
      text: String(pointIds.length) + ' points',
      points: pointIds,
      author: Meteor.userId()
    };

    var listId = _processList(list);

    return listId;
  },
  updateList: function(listId, pointIds) {
    Lists.update({_id: listId}, {$set:{
      points: _processPointIds(pointIds)
    }});
  }
});

_processPointIds = function (pointIds) {
  var points = [];
  for (var i = 0; i < pointIds.length; i++) {
    points.push({
      id: pointIds[i]
    });
  };
  return points;
}

_processList = function (list) {
  var listId = Lists.insert(list);
  console.log(list);
  for (var i = 0; i < list.points.length; i++) {
    if (i > 0) {
      Edges.insert({
        points: [list.points[i-1].id, list.points[i].id],
        author: Meteor.userId(),
        list: listId
      });
    }
  };

  Meteor.users.update({_id: Meteor.userId()}, {
    $set: {"profile.cart": []},
    $addToSet: {"profile.lists": listId}
  });

  return listId;
}
