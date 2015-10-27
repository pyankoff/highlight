Essays = new Meteor.Collection( 'essays' );

Essays.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Essays.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Schemas.range = new SimpleSchema({
  start: {
    type: Number
  },
  end: {
    type: Number
  }
});

Schemas.essayPoints = new SimpleSchema({
  id: {
    type: String
  },
  text: {
    type: String
  },
  range: {
    type: Schemas.range
  }
});

Schemas.essays = new SimpleSchema({
  text: {
    type: String
  },
  annotatedHtml: {
    type: String,
    optional: true
  },
  url: {
    type: String,
    optional: true
  },
  author: {
    type: String,
    optional: true
  },
  points: {
    type: [Schemas.essayPoints],
    optional: true
  }
});

Essays.attachSchema(Schemas.essays);
