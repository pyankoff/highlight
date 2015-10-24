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

let PointsSchema = new SimpleSchema({
  text: {
    type: String
  },
  source: {
    type: String,
    optional: true
  }
});

Points.attachSchema( PointsSchema );
