Template.pointItem.helpers({
  pointUrl: function () {
    return FlowRouter.path('point', {id: this._id});
  },
  authorUrl: function () {
    return FlowRouter.path('author', {id: this.author});
  },
  essayUrl: function () {
    return FlowRouter.path('essay', {id: this.source}, {point: this._id});
  },
  owned: function () {
    return _.contains(Meteor.user().profile.cart, this._id) ? "owned" : "";
  },
  favCountDisplay: function () {
    return this.favCount === 0 ? '' : this.favCount;
  },
  connectToThis: function() {
    var replyId = Session.get('connectTo');
    return replyId && replyId == this._id;
  },
});

Template.pointItem.events({
  "click .fa-cart-plus": function(e){
     Meteor.call("addToCart", this._id);
  },
  "click .fa-reply": function(e){
    Session.set('reply', this._id);
    $('.point-input input').val('#' + this._id + ' ');
    $('.point-input input').focus();
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
    Meteor.call('removeEdge', [id, this._id]);
  },
  "click .point-item": function(e){
    if (!$(e.target).hasClass('fa') &&
        !$(e.target).hasClass('btn') &&
        !$(e.target).hasClass('selectize-input') &&
        !$(e.target).is('input')) {

      e.stopImmediatePropagation();
      Session.set('connectTo', undefined);
      FlowRouter.go('point', {id: this._id});
    }
  }
});
