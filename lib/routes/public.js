const publicRedirect = () => {
  if ( Meteor.userId() ) {
    FlowRouter.go( 'index' );
  }
};

const publicRoutes = FlowRouter.group({
  name: 'public',
  triggersEnter: [ publicRedirect ]
});

FlowRouter.route('/point/:id', {
  name: 'point',
  action() {
    BlazeLayout.render( 'default', { yield: 'pointPage' } );
  }
});

FlowRouter.route('/essay/:id', {
  name: 'essay',
  action() {
    BlazeLayout.render( 'default', { yield: 'essayPage' } );
  }
});


AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
