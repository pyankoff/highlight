Meteor.methods({
  newPoint: (point) => {
     var id = Points.insert(point);
     return id;
  }
});
