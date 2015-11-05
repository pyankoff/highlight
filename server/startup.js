let startup = () => {
  _setBrowserPolicies();
  _addTwitterLogin();
  _addSitemap();

  Sortable.collections = 'points';
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

var _addSitemap = () => {
  sitemaps.add('/sitemap.xml', function() {
    var out = [], lists = Lists.find().fetch();
    _.each(lists, function(list) {
      out.push({
        page: 'list/' + list._id,
        lastmod: list.updatedAt
      });
    });
    return out;
  });
};

Meteor.startup( () => startup() );
