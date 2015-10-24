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

let EdgesSchema = new SimpleSchema({
  source: {
    type: String
  },
  target: {
    type: String
  },
  weight: {
    type: Number
  }
});

Edges.attachSchema( EdgesSchema );
