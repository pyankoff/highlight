Meteor.methods({
  makeGraph:function(){
    Lists.find().forEach((list) => {
      for (var i = 0; i < list.points.length; i++) {
        if (i > 0) {
          Edges.insert({
            points: [list.points[i-1], list.points[i]],
            author: list.author,
            list: list._id
          });
        }
      }
    });
  }
});
