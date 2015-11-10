Template.wiki.helpers({
  wikiCount: function(){
    return Wiki.find().count();
  },
  wiki: function(){
    var wiki = Wiki.findOne();

    _.each(wiki.text, function (texts, subtitle) {
      console.log(subtitle);
      console.log(texts);
      _.each(texts, function (point) {
        console.log(point.text);
      })
    })

    return wiki;
  }
});


Template.wiki.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });
});
