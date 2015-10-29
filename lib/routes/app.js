const authenticatedRedirect = () => {
  if ( !Meteor.loggingIn() && !Meteor.userId() ) {
    FlowRouter.go( 'atSignIn' );
  }
};

const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [ authenticatedRedirect ]
});

authenticatedRoutes.route( '/', {
  name: 'index',
  action() {
    BlazeLayout.render( 'default', { yield: 'index' } );
  }
});

authenticatedRoutes.route( '/lists', {
  name: 'lists',
  action() {
    BlazeLayout.render( 'default', { yield: 'lists' } );
  }
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

FlowRouter.route('/list/:id', {
  name: 'list',
  action() {
    BlazeLayout.render( 'default', { yield: 'listPage' } );
  }
});
