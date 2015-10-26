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
  source: {
    type: String,
    optional: true
  },
  tags: {
    type: [String],
    optional: true
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
  }
});

Points.attachSchema(Schemas.points);
