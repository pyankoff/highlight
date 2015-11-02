Meteor.methods({
  addToCart: function(id) {
    var userId = Meteor.userId();
     if (!_.contains(Meteor.user().profile.cart, id)) {
       Meteor.users.update({_id: userId}, {$addToSet:{
         "profile.cart": id
       }});
     } else {
       Meteor.users.update({_id: userId}, {$pull:{
         "profile.cart": id
       }});
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
    list.points = pointIds;

    if (!list.text) {
      list.text = String(pointIds.length)+ ' points ✎';
    };

    var listId = _processList(list);

    return listId;
  },
  saveListInput: function(points) {
    var pointIds = [];
    for (var i = 0; i < points.length; i++) {
      var pointId = Points.insert({
        text: points[i],
        author: Meteor.userId()
      });
      pointIds.push(pointId);
    };

    var list = {
      text: String(pointIds.length) + ' points ✎',
      points: pointIds,
      author: Meteor.userId(),
      updatedAt: new Date()
    };

    var listId = _processList(list);

    return listId;
  },
  updateList: function(listId, pointIds) {
    Lists.update({_id: listId}, {$set:{
      points: pointIds,
      updatedAt: new Date()
    }});
  },
  submitPoint: function(point) {
    var id = Points.insert({
      text: point.text,
      author: Meteor.userId()
    });

    if (point.reply) {
      Edges.insert({
        points: [point.reply, id],
        author: Meteor.userId(),
        list: point.listId
      });

      var list = Lists.findOne({_id: point.listId});
      var points = list.points;
      points.splice(points.indexOf(point.reply)+1, 0, id);

      Lists.update({_id: point.listId}, {$set:{
        points: points,
        updatedAt: new Date()
      }});
    } else {
      Lists.update({_id: point.listId}, {$addToSet:{
        points: id,
        updatedAt: new Date()
      }});
    }

    _processHashtags(point.text, id);

    return id;
  }
});

var _processList = function (list) {
  list.updatedAt = new Date();
  var listId = Lists.insert(list);
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
};

var _processHashtags = function (pointText, pointId) {
  var hashtags = pointText.match(/#\S+/g);

  if (hashtags) {
    for (var i = 0; i < hashtags.length; i++) {
      Lists.update({text: hashtags[i]}, {$addToSet:{
        points: pointId,
        updatedAt: new Date()
      }});
    }
  }
}
