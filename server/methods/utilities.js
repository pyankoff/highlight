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
  },
  wikiToPoints: function () {
    Points.remove({type: 'wiki'});
    Lists.remove({type: 'wiki'});

    Wiki.find({type: 'page'}, {}).forEach((page) => {
      _.each(page.text, function (points, subtitle) {
        var listId = Lists.insert({
          text: page.title+' - '+subtitle,
          points: [],
          updatedAt: new Date(),
          type: 'wiki'
        });

        _.each(points, function (point) {
          var pointId = Points.insert({
            text: point.text,
            type: 'wiki'
          });
          Lists.update({_id: listId}, {$addToSet:{
            points: pointId,
            updatedAt: new Date()
          }});
        })
      })
    });
  }
});
