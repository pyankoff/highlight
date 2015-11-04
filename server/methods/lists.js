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
  updateList: function(listId, pointIds) {
    Lists.update({_id: listId}, {$set:{
      points: pointIds,
      updatedAt: new Date()
    }});
  },
  deleteList:function(id){
    var list = Lists.findOne({_id: id});

    Lists.remove({_id: id});

    var count = 0;
    for (var i = 0; i < list.points.length; i++) {
      var pointId = list.points[i];
      if (!Lists.findOne({points: pointId})) {
        Points.remove({_id: pointId});
        count += 1;
      }
    };
    console.log('Removed ' + count + ' points');
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
