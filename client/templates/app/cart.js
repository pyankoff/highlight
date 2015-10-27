Template.cart.helpers({
  cartNotEmpty: function(){
    return Meteor.user().profile.cart.length;
  },
  cartPoints: function(){
    return Points.find({"_id": {$in: Meteor.user().profile.cart}});
  }
});

Template.cart.events({
  "submit .save-cluster": function(e){
    e.preventDefault();

    var cluster = {
      author: Meteor.userId(),
      name: e.target.text.value,
      points: Meteor.user().profile.cart
    }

    Meteor.call("cartToCluster", cluster, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        Bert.alert({
          title: 'Collection created',
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-check'
        });
      }
    });

    e.target.reset();
  }
});

Template.cart.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });
});
