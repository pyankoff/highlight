Meteor.methods({
  savePoint: (data) => {
    Essays.update({_id: data.essayId}, {$set:{
      annotatedHtml: data.htmlString
    }});
    Points.update({_id: data.pointId}, {$set:{
      tags: data.tags
    }});
  }
});
