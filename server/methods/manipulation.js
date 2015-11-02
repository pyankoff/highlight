Meteor.methods({
  exportPoints:function(fromList, toList, pointIds){
    console.log(toList);
    Lists.update({_id: toList}, {$addToSet:{
      points: {$each: pointIds}
    }, $set: {
      updatedAt: new Date()
    }});
  }
});
