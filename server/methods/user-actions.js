Meteor.methods({
  addToCart: function(id) {
    var userId = Meteor.userId();
     if (!_.contains(Meteor.user().profile.cart, id)) {
       Meteor.users.update({_id: userId}, {$addToSet:{
         "profile.cart": id
       }});
       Points.update({_id: id}, {$inc: {favCount: 1}});
     } else {
       Meteor.users.update({_id: userId}, {$pull:{
         "profile.cart": id
       }});
       Points.update({_id: id}, {$inc: {favCount: -1}});
     }
  },
  cartToCluster: function(cluster) {
    var clusterId = Clusters.insert(cluster);
    Meteor.users.update({_id: Meteor.userId()}, {
      $set: {"profile.cart": []},
      $addToSet: {"profile.clusters": clusterId}
    });

    return clusterId;
  }
});
