const publicRedirect = () => {
  if ( Meteor.userId() ) {
    FlowRouter.go( 'index' );
  }
};

const publicRoutes = FlowRouter.group({
  name: 'public',
  triggersEnter: [ publicRedirect ]
});


AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
