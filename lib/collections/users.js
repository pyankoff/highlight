Meteor.users.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Meteor.users.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Schemas.profile = new SimpleSchema({
  name: {
    type: String,
    optional: true
  },
  upvotes: {
    type: [String],
    optional: true,
    blackbox: false
  }
});

Schemas.users = new SimpleSchema({
  emails: {
      type: Array,
      optional: true
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    profile: {
        type: Schemas.profile,
        optional: true,
        blackbox: false
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    }
});

Meteor.users.attachSchema(Schemas.users);
