// Options
AccountsTemplates.configure({
  defaultLayout: 'default',
  defaultLayoutRegions: {
  },
  defaultContentRegion: 'yield',
  showForgotPasswordLink: true,
  overrideLoginErrors: true,
  enablePasswordChange: true,

  confirmPassword: false,

  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: false,
  positiveFeedback: true
});

AccountsTemplates.addField({
    _id: 'name',
    required: true,
    type: 'text'
});

PointsIndex = new EasySearch.Index({
  collection: Points,
  fields: ['text'],
  engine: new EasySearch.Minimongo()
});
