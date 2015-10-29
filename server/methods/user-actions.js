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
  updateCart: function(cart) {
    var userId = Meteor.userId();
    Meteor.users.update({_id: userId}, {$set:{
      "profile.cart": cart
    }});
  },
  saveList: function(list) {
    var points = [];
    for (var i = 0; i < list.points.length; i++) {
      points.push({
        id: list.points[i]
      });
    }

    list.points = points;
    
    var listId = Lists.insert(list);

    Meteor.users.update({_id: Meteor.userId()}, {
      $set: {"profile.cart": []},
      $addToSet: {"profile.lists": listId}
    });

    return listId;
  }
});
