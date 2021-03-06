FlowRouter.route( '/', {
  name: 'home',
  action() {
    BlazeLayout.render( 'default', { yield: 'home' } );
  }
});

FlowRouter.route( '/chat', {
  name: 'chat',
  action() {
    BlazeLayout.render( 'default', { yield: 'chat' } );
  }
});

FlowRouter.route( '/lists', {
  name: 'lists',
  action() {
    BlazeLayout.render( 'default', { yield: 'lists' } );
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

FlowRouter.route('/wiki', {
  name: 'wiki',
  action() {
    BlazeLayout.render( 'default', { yield: 'wiki' } );
  }
});


FlowRouter.route('/v2', {
  name: 'v2',
  action() {
    BlazeLayout.render( 'v2', { yield: 'main' } );
  }
});
