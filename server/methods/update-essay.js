Meteor.methods({
  updateEssay: (essayId, text) => {
    Essays.update({_id: essayId}, {$set:{
      text: text
    }});
  }
});
