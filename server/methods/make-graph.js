Meteor.methods({
  makeGraph:function(){
     Points.find().forEach((p1) => {
       var targets = [];
       Points.find().forEach((p2) => {
         if (p1._id != p2._id &&
           _.intersection(p1.tags, p2.tags).length > 0) {
           targets.push({
             id: p2._id,
             weight: _.intersection(p1.tags, p2.tags).length
           });
         };
       });
       Points.update({_id: p1._id}, {$set:{
         targets: targets
       }});
     })
  }
});
