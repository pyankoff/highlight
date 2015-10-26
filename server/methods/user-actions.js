Meteor.methods({
  favorite: function(id) {
    var userId = Meteor.userId();
     if (!_.contains(Meteor.user().profile.upvotes, id)) {
       Meteor.users.update({_id: userId}, {$addToSet:{
         "profile.upvotes": id
       }});
       Points.update({_id: id}, {$inc: {favCount: 1}});
     } else {
       Meteor.users.update({_id: userId}, {$pull:{
         "profile.upvotes": id
       }});
       Points.update({_id: id}, {$inc: {favCount: -1}});
     }
  }
});
