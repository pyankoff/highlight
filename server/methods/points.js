Meteor.methods({
  submitPoint: function(point) {
    var id = Points.insert({
      text: point.text,
      author: Meteor.userId()
    });

    if (point.reply) {
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
  },
  exportPoints:function(fromList, toList, pointIds){
    console.log(toList);
    Lists.update({_id: toList}, {$addToSet:{
      points: {$each: pointIds}
    }, $set: {
      updatedAt: new Date()
    }});
  },
  removeFromList:function(ids){
    var listId = ids.listId,
        pointId = ids.pointId;

    Lists.update({_id: listId}, {$pull:{
      points: pointId
    }});

    if (!Lists.findOne({points: pointId})) {
      Points.remove({_id: pointId});
    }
  }
});

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
