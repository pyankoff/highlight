Template.listItem.helpers({
  listLink: function() {
    return FlowRouter.path('list', {id: this._id});
  },
  pointCount: function() {
    return this.points.length;
  },
  timeFromNow: function() {
    return moment(this.updatedAt).fromNow();
  },
  canEdit: function () {
    return this._id === Meteor.userId();
  }
});

Template.listItem.events({
  "click .fa-times": function(e){
     Meteor.call("deleteList", this._id, function(error, result){
       if(error){
         console.log("error", error);
       } else {
         Bert.alert({
           title: 'Removed list',
           type: 'warning',
           style: 'growl-top-right',
           icon: 'fa-times'
         });
       }
     });
  }
});
