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

Schemas.clusters = new SimpleSchema({
  name: {
    type: String
  }
});

Clusters.attachSchema(Schemas.clusters);
