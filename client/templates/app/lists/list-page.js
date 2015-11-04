Template.listPage.helpers({
  list: function () {
    var id = FlowRouter.getParam('id');
    return Lists.findOne(id);
  },
  listPoints: function(){
    var id = FlowRouter.getParam('id'),
        list = Lists.findOne(id);
    Session.set("listId", id);
    Session.set('ids', list.points);
    var points = Points.find({_id: {$in: list.points}}).fetch();
    points = _.sortBy(points, function(doc) {
      return list.points.indexOf(doc._id)
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
  },
  "click .selected-count": function(e) {
    var selected = Session.get('selected');

    $('.export-list').toggle();
    $('.selectize-input > input')[0].focus();
  },
  "click .export-list .btn": function(e) {
    var fromList = FlowRouter.getParam('id'),
        toList = $('#listSelect')[0].selectize.items[0],
        selected = Session.get('selected');

    Meteor.call('exportPoints', fromList, toList, selected, function(error, result) {
      $('.export-list').hide();

      Bert.alert({
        title: 'Points sent to new list',
        type: 'success',
        style: 'growl-top-right',
        icon: 'fa-check'
      });

      Session.set('selected', undefined);
    });
  },

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
