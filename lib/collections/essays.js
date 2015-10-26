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

Schemas = {}

Schemas.essays = new SimpleSchema({
  original: {
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
  }
});

Essays.attachSchema(Schemas.essays);
