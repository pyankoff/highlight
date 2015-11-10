Meteor.methods({
  saveList: function(list) {
    if (!list.text) {
      list.text = String(list.points.length)+ ' points ✎';
    };

    var listId = _processList(list);

    return listId;
  },
  saveListInput: function(points) {
    var pointIds = [];
    for (var i = 0; i < points.length; i++) {
      var pointId = Points.insert({
        text: points[i],
        author: Meteor.userId(),
        createdAt: new Date()
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
  updateList: function(finder, modifier) {
    Lists.update(finder, modifier);
  },
  deleteList:function(id){
    var list = Lists.findOne({_id: id});

    Lists.remove({_id: id});
  }
});

var _processList = function (list) {
  list.updatedAt = new Date();
  var listId = Lists.insert(list);

  Meteor.users.update({_id: Meteor.userId()}, {
    $addToSet: {"profile.lists": listId}
  });

  return listId;
};
