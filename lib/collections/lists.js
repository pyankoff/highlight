Lists = new Meteor.Collection( 'lists' );

Lists.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Lists.deny({
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
    type: String,
    optional: true
  },
  range: {
    type: Schemas.range,
    optional: true
  }
});

Schemas.lists = new SimpleSchema({
  text: {
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

Lists.attachSchema(Schemas.lists);
