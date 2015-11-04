const authenticatedRedirect = () => {
  if ( !Meteor.loggingIn() && !Meteor.userId() ) {
    FlowRouter.go( 'atSignIn' );
  }
};

const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [ authenticatedRedirect ]
});

authenticatedRoutes.route( '/cart', {
  name: 'cart',
  action() {
    BlazeLayout.render( 'default', { yield: 'cart' } );
  }
});

authenticatedRoutes.route( '/new-point', {
  name: 'newPoint',
  action() {
    BlazeLayout.render( 'default', { yield: 'pointInput' } );
  }
});

authenticatedRoutes.route( '/new-list', {
  name: 'newList',
  action() {
    BlazeLayout.render( 'default', { yield: 'listInput' } );
  }
});
