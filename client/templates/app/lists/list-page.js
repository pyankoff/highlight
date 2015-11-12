Template.listPage.helpers({
  item: function() {
    var item;
    var id = Session.get('selected');

    if (id) {
      item = Points.findOne(id);
      item.coll = 'points';
    } else {
      var id = FlowRouter.getParam('id');
      item = Lists.findOne(id);
      item.coll = 'lists';
    }

    return item;
  },
  list: function () {
    var id = FlowRouter.getParam('id');
    return Lists.findOne(id);
  },
  listPoints: function(){
    var id = FlowRouter.getParam('id'),
        list = Lists.findOne(id),
        pointIds = list.points.map(p => p.id);
    Session.set("listId", id);
    Session.set('ids', pointIds);
    var points = Points.find({_id: {$in: pointIds}}).fetch();

    points = _.sortBy(points, function(doc) {
      return pointIds.indexOf(doc._id)
    });

    return points;
  },
  selectedCount: function() {
    var selected = Session.get('selected');
    return selected && selected.length ? selected.length : '';
  },
  chatUrl: function() {
    var id = FlowRouter.getParam('id');
    return FlowRouter.path('chat', {}, {anchor: id});
  }
});

Template.listPage.events({
  "click .fa-reply": function(e) {
    if (Meteor.user()) {
      FlowRouter.go('chat', {}, {'anchor': this._id});
      Session.set('replyTo', this._id);
      e.stopImmediatePropagation();
    } else {
      FlowRouter.go('atSignIn');
    }
  }
});

Template.listPage.onCreated(function() {
  var id = FlowRouter.getParam('id');
  this.subscribe('singleList', id, {onReady: function() {
    var list = Lists.findOne();
    SEO.set({
      title: list.text,
      description: list.text + " - best ideas, thoughts, notes.",
    });
  }});
});
