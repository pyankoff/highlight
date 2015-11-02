Template.exportList.onRendered(function() {
  Tracker.autorun(function(){
    $('#listSelect').selectize({
      valueField: '_id',
      maxItems: 1,
      options: [],
      load: function(query, callback) {
        if (!query.length) return callback();

        var lists = Lists.find({author: Meteor.userId()}).fetch();

        callback(lists);
      },
      create: function(input) {
        var id = Lists.insert({
          text: input,
          author: Meteor.userId()
        });
        return {
          text: input,
          _id: id
        };
      }
    });
  });
});

Template.exportList.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('lists');
  });
});
