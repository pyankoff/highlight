Meteor.methods({
  search: function(query) {
    var options = {};
    options.limit = 10;

    // TODO fix regexp to support multiple tokens
    var regex = new RegExp(query);
    return Points.find({text: {$regex: regex, $options: '-i'}}, options).fetch();
  }
});
