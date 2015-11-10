Points = new Meteor.Collection( 'points' );

Points.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Points.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Schemas.tagsAutoform = {
      type: 'selectize',
      label: 'Connect points',
      placeholder: 'Search...',
      selectizeOptions: {
        valueField: '_id',
        labelField: 'text',
        searchField: 'text',
        // maxItems: 1,
        load: function(query, callback) {
          if (!query.length) return callback();

          var points = Points.find({
            _id: {
              $in: Meteor.user().profile.points
            }
          }).fetch();

          callback(points);
        },
        create: function(input) {
          var id = Points.insert({text: input});
          return {
            text: input,
            _id: id
          };
        }
      }
    }

Schemas.target = new SimpleSchema({
  id: {
    type: String
  },
  type: {
    type: String,
    optional: true
  },
  weight: {
    type: Number,
    decimal: true,
    optional: true
  }
});

Schemas.points = new SimpleSchema({
  text: {
    type: String
  },
  type: {
    type: String,
    optional: true
  },
  source: {
    type: String,
    optional: true
  },
  tags: {
    type: [String],
    optional: true,
    autoform: Schemas.tagsAutoform
  },
  targets: {
    type: [Schemas.target],
    optional: true
  },
  author: {
    type: String,
    optional: true
  },
  favCount: {
    type: Number,
    optional: true
  },
  createdAt: {
    type: Date,
    optional: true
  }
});

Points.attachSchema(Schemas.points);
