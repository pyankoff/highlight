Template.mainNav.helpers({
  cartCount: function(){
    return Meteor.user().profile.cart.length;
  }
});

Template.mainNav.events({
  "click .new-point": function(e){
     FlowRouter.go('newPoint');
     $(e.currentTarget).blur();
  }
});
