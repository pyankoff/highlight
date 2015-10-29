Template.cart.helpers({
  cartNotEmpty: function(){
    return Meteor.user().profile.cart.length != 0;
  },
  cartPoints: function(){
    var cart = Meteor.user().profile.cart;
    return Points.find({"_id": {$in: cart}});
  }
});

Template.cart.events({
  "click .save-list": function(e){
    e.preventDefault();

    var list = {
      author: Meteor.userId(),
      points: Session.get('ids')
    }

    Meteor.call("saveList", list, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        Bert.alert({
          title: 'New list created',
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-check'
        });

        FlowRouter.go('list', {id: result});
      }
    });
  }
});

Template.cart.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });
});
