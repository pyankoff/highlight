let startup = () => {
  _setBrowserPolicies();
  _addTwitterLogin();
};

var _setBrowserPolicies = () => {};

var _addTwitterLogin = () => {
  Meteor.startup(function () {
    Accounts.loginServiceConfiguration.remove({
      service: "twitter"
    });
    Accounts.loginServiceConfiguration.insert({
      service: "twitter",
      consumerKey: Meteor.settings.private.twitterConsumerKey,
      secret: Meteor.settings.private.twitterSecret
    });
  });
};

Modules.server.startup = startup;
