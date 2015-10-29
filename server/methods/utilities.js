Meteor.methods({
  makeGraph:function(){
     Points.find().forEach((p1) => {
       var targets = [];
       Points.find().forEach((p2) => {
         var sim = _distance(p1.text, p2.text);
         if (p1._id != p2._id &&
           sim > 0) {
           targets.push({
             id: p2._id,
             weight: sim
           });
         };
       });
       Points.update({_id: p1._id}, {$set:{
         targets: targets
       }});
     })
  },
  copyAuthors: function () {
    Points.find().forEach((point) => {
      var essay = Lists.findOne(point.source);

      Points.update({_id: point._id}, {$set:{
        author: essay.author
      }});
    });

  }
});

var _distance = function (p1, p2) {
  var stopWords = ['in', 'at', 'the', 'of', 'with', 'a'];

  p1words = p1.toLowerCase().split(' ');
  p2words = p2.toLowerCase().split(' ');

  p1words = _.difference(p1words, stopWords);
  p2words = _.difference(p2words, stopWords);

  score = 0;
  for (var i = 0; i < p1words.length; i++) {
    for (var j = 0; i < p2words.length; i++) {
      if (p1words[i] === p2words[j]) {
        score += 1;
      }
    }
  };

  return score;
}
