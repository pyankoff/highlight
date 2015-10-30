_newPoint = function(point) {
  _.extend(point, {
    targets: [],
    favCount: 0
  });
  var id = Points.insert(point);
  return id;
}

Meteor.methods({
  newPoint: (point) => {
    return _newPoint(point);
  },
  savePoint: (data) => {
    Lists.update({_id: data.essayId}, {$set:{
      annotatedHtml: data.htmlString
    }});
    Points.update({_id: data.pointId}, {$set:{
      clusters: data.clusters
    }});
  }
});
