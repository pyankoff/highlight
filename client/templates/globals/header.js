Template.header.helpers({
  brandLink() {
    let home = FlowRouter.path( 'home' ),
        lists = FlowRouter.path( 'lists' );
    return !Meteor.loggingIn() && !Meteor.userId() ? home : lists;
  }
});

Template.header.events({
  'click .logout' () {
    Meteor.logout( ( error ) => {
      if ( error ) {
        Bert.alert( error.reason, 'warning' );
      } else {
        Bert.alert( 'Logged out!', 'success' );
      }
    });
  },
  'click .navbar-collapse.in': function(e) {
    if(!$(e.target).hasClass('dropdown-toggle')) {
        $('.navbar-collapse').collapse('hide');
    }
  }
});
