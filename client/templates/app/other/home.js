var introId = 'yX9xxCLusER3bteiy';

Template.home.helpers({
  intro: function(){
    var list = Lists.findOne(introId);

    var points = Points.find({_id: {$in: list.points}}).fetch();
    points = _.sortBy(points, function(doc) {
      return list.points.indexOf(doc._id)
    });

    return points;
  },
  lists: function () {
    return Lists.find({}, {
      sort: {updatedAt: -1},
      limit: 5
    });
  }
});


Template.home.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('singleList', introId);
    self.subscribe('lists');
  });
});
