Template.pointItem.helpers({
  pointUrl: function () {
    return FlowRouter.path('point', {id: this._id});
  },
  authorUrl: function () {
    return FlowRouter.path('author', {id: this.author});
  },
  canEdit: function() {
    var listId = FlowRouter.getParam('id');
    var list = Lists.findOne(listId);
    return list && list.author === Meteor.userId();
  },
  listOwner: function() {
    var anchor = FlowRouter.getQueryParam('anchor');
    var list = Lists.findOne(anchor);

    return list && list.author === Meteor.userId();
  }
});

Template.pointItem.events({
  "click .point-item": function(e) {
    if (!$(e.target).hasClass('fa')) {
      FlowRouter.go('chat', {}, {'anchor': this._id});
      e.stopImmediatePropagation();
    }
  },
  "click .fa-link": function(e){
    if (Session.get('connectTo') != this._id) {
      Session.set('connectTo', this._id);
      $('#connectionsForm input').focus();
      AutoForm.addHooks(this._id, {
        onSuccess: function(operation, comment) {
          Bert.alert({
            title: 'Connections added',
            type: 'success',
            style: 'growl-top-right',
            icon: 'fa-check'
          });
          Session.set('connectTo', undefined);
        }
      });
    } else {
      Session.set('connectTo', undefined);
    }
  },
  "click .fa-times": function(e){
    var id = FlowRouter.getParam('id');
    Meteor.call('removeFromList',
                {listId: id, pointId: this._id},
                function(error, result){
      if(error){
        console.log("error", error);
      } else {
        Bert.alert({
          title: 'Removed point',
          type: 'warning',
          style: 'growl-top-right',
          icon: 'fa-times'
        });
      }
    });
  },
  "click .fa-save": function(e){
    var anchor = FlowRouter.getQueryParam('anchor');
    Meteor.call('addToList',
                {listId: anchor, pointId: this._id},
                function(error, result){
      if(error){
        console.log("error", error);
      } else {
        Bert.alert({
          title: 'Added point to your list',
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-check'
        });
      }
    });
  }
});
