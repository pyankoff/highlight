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

Schemas.listPoint = new SimpleSchema({
  id: {
    type: String
  },
  place: {
    type: Object,
    optional: true,
    blackbox: true
  }
});

Schemas.lists = new SimpleSchema({
  text: {
    type: String,
    optional: true
  },
  type: {
    type: String,
    optional: true
  },
  updatedAt: {
    type: Date,
    optional: true
  },
  author: {
    type: String,
    optional: true
  },
  points: {
    type: [Schemas.listPoint],
    optional: true
  },
  slug: {
    type: String,
    optional: true
  }
});

Lists.attachSchema(Schemas.lists);
