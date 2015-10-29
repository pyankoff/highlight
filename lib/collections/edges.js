Edges = new Meteor.Collection( 'edges' );

Edges.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Edges.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Schemas.edges = new SimpleSchema({
  points: {
    type: [String],
    minCount: 2,
    maxCount: 2
  },
  text: {
    type: String,
    optional: true
  },
  list: {
    type: String,
    optional: true
  },
  author: {
    type: String,
    optional: true
  }
});

Edges.attachSchema(Schemas.edges);
