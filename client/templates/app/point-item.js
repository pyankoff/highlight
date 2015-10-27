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
  }
});

Template.pointItem.events({
  "click .fa-cart-plus": function(e){
     Meteor.call("addToCart", this._id);
  },
  "click .fa-reply": function(e){
    $('.point-input input').val('@' + this.author + ' ');
    $('.point-input input').focus();
  },
  "click .point-item": function(e){
    if (!$(e.target).hasClass('fa')) {
      e.stopImmediatePropagation();
      FlowRouter.go('point', {id: this._id});
    }
  }
});
