Clusters = new Meteor.Collection( 'clusters' );

Clusters.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Clusters.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Schemas = {}

Schemas.clusters = new SimpleSchema({
  name: {
    type: String,
    optional: true
  },
  points: {
    type: [String],
    optional: true
  }
});

Clusters.attachSchema(Schemas.clusters);
