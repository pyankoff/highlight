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

var Schemas = {}

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

let PointsSchema = new SimpleSchema({
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
  }
});

Points.attachSchema( PointsSchema );
