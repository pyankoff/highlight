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
  }
});

Template.listPage.events({
  "click .point-item": function(e) {
    if (!$(e.target).hasClass('fa')) {
      var selected = Session.get('selected');
      selected = selected ? selected : [];
      if (_.contains(selected, this._id)) {
        selected.splice(selected.indexOf(this._id), 1);
      } else {
        selected.push(this._id);
      };
      Session.set('selected', selected);
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
  "submit .point-input": function(e, template){
    e.preventDefault();

    var listId = FlowRouter.getParam('id');
    var text = e.target.text.value;
    var reply = Session.get('reply');

    if (reply) {
      text = text.substr(text.indexOf(' ')+1);
    }

    var point = {
      text: text,
      reply: reply,
      listId: listId
    };

    Meteor.call("submitPoint", point, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        var place = 'div[class="'+ result +'"]'

        Meteor.setTimeout(function(){
          $.scrollTo(place, 300, {offset: -50});
          $(place).delay(300).effect("highlight", {}, 2000);
        }, 0);
      }
    });

    Session.set('reply', undefined);
    e.target.reset();
  }
});

Template.listPage.onCreated(function() {
  var self = this;
  var id = FlowRouter.getParam('id');
  self.autorun(function() {
    self.subscribe('singleList', id);
  });
});
