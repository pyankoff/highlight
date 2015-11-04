Template.chat.helpers({
  chatPoints: function(){
    return Points.find({}, {sort: {createdAt: 1}});
  }
});

Template.chat.events({
  "click .fa-reply": function(e) {
    if (Meteor.user()) {
      Session.set('replyTo', this._id);
    } else {
      FlowRouter.go('atSignIn');
    }
  },
  "submit .point-input": function(e, template){
    e.preventDefault();

    var anchor = FlowRouter.getQueryParam('anchor');
    var text = e.target.text.value;
    var replyTo = Session.get('replyTo');

    var point = {
      text: text,
      anchor: anchor,
      replyTo: replyTo
    };

    Meteor.call("chatPoint", point, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        var place = 'div[class="'+ result +'"]'

        Meteor.setTimeout(function(){
          $.scrollTo(place, 100, {offset: -50});
          $(place).effect("highlight", {}, 2000);
        }, 0);
      }
    });

    e.target.reset();
  }
});

Template.chat.onCreated(function() {
  var self = this;
  var anchor = FlowRouter.getQueryParam('anchor');
  self.autorun(function() {
    self.subscribe('chat', anchor);
  });
});
