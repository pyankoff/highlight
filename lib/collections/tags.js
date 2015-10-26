Tags = new Meteor.Collection( 'tags' );

Tags.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Tags.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Schemas.tags = new SimpleSchema({
  name: {
    type: String
  }
});

Tags.attachSchema(Schemas.tags);
