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
  submitPoint: (point, relatedId) => {
    var id = _newPoint(point);
    var relatedTargets = Points.findOne(relatedId).targets;
    var targets = [];
    for (var i = 0; i < relatedTargets.length; i++) {
     Points.update({_id: relatedTargets[i].id}, {$addToSet:{
       targets: {
         id: id,
         weight: 1.0
       }
     }});
     targets.push({
       id: relatedTargets[i].id,
       weight: 1.0
     })
    }

    Points.update({_id: id}, {$set:{
     targets: targets
    }});

    Points.update({_id: relatedId}, {$addToSet:{
     targets: {
       id: id,
       weight: 1.5
     }
    }});

    return id;
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
