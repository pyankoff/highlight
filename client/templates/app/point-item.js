Template.pointItem.helpers({
  pointUrl: function () {
    return FlowRouter.path('point', {id: this._id});
  },
  authorUrl: function () {
    return FlowRouter.path('author', {id: this.author});
  },
  essayUrl: function () {
    return FlowRouter.path('essay', {id: this.source});
  },
  upvoted: function () {
    return _.contains(Meteor.user().profile.upvotes, this._id) ? "upvoted" : "";
  },
  favCountDisplay: function () {
    return this.favCount === 0 ? '' : this.favCount;
  }
});

Template.pointItem.events({
  "click .fa-star": function(e, template){
     Meteor.call("favorite", this._id);
  }
});
