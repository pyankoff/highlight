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
  selected: function () {
    return _.contains(Session.get('selected'), this._id) ? "selected-item" : "";
  },
  favCountDisplay: function () {
    return this.favCount === 0 ? '' : this.favCount;
  },
  connectToThis: function() {
    var replyId = Session.get('connectTo');
    return replyId && replyId == this._id;
  },
  editableOptions: function() {
    return {
      collection: 'points',
      field: 'text',
      textarea: true,
      eventType: 'dblclick'
    }
  }
});

Template.pointItem.events({
  "click .fa-reply": function(e) {
    if (Meteor.user()) {
      Session.set('reply', this._id);
      $('.point-input input').val('#' + this._id + ' ');
      $('.point-input input').focus();
    } else {
      FlowRouter.go('atSignIn');
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
  }
});
