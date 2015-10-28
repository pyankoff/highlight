Meteor.methods({
  inputPoint: (point) => {
    var id = Points.insert(point);

    _addEdges(id, point.tags);

    return id;
  },
  addEdges: (modifier, id) => {
    var points = modifier.$set.tags;

    _addEdges(id, points)
  },
  removeEdge: (points) => {
    Edges.remove({points: {$all: points}});
  }
});

_addEdges = function (id, points) {
  var existing = [];
  Edges.find({points: id, author: Meteor.userId()}).forEach((edge) => {
    existing.push(_.without(edge.points, id)[0]);
  });
  points = _.difference(points, existing);

  for (var i = 0; i < points.length; i++) {
    Edges.insert({
      points: [id, points[i]],
      author: Meteor.userId()
    });
  }

  points.push(id);

  Meteor.users.update({_id: Meteor.userId()}, {$addToSet:{
    "profile.points": {$each: points}
  }});
}
