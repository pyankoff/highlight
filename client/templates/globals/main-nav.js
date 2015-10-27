Template.mainNav.helpers({
  cartCount: function(){
    return Meteor.user().profile.cart.length;
  }
});
