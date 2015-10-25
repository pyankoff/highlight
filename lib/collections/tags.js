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

let TagsSchema = new SimpleSchema({
  name: {
    type: String
  }
});

Tags.attachSchema( TagsSchema );
