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

let EssaysSchema = new SimpleSchema({
  text: {
    type: String
  },
  url: {
    type: String,
    optional: true
  }
});

Essays.attachSchema( EssaysSchema );
