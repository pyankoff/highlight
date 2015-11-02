Template.listPage.helpers({
  list: function () {
    var id = FlowRouter.getParam('id');
    return Lists.findOne(id);
  },
  listPoints: function(){
    var id = FlowRouter.getParam('id'),
        list = Lists.findOne(id);
    Session.set("listId", id);
    Session.set('ids', list.points);
    var points = Points.find({_id: {$in: list.points}}).fetch();
    points = _.sortBy(points, function(doc) {
      return list.points.indexOf(doc._id)
    });

    return points;
  }
});

Template.listPage.events({
  "submit .point-input": function(e, template){
    e.preventDefault();

    var listId = FlowRouter.getParam('id');
    var text = e.target.text.value;
    var reply = Session.get('reply');

    if (reply) {
      text = text.substr(text.indexOf(' ')+1);
    }

    var point = {
      text: text,
      reply: reply,
      listId: listId
    };

    Meteor.call("submitPoint", point, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        var place = 'div[class="'+ result +'"]'

        Meteor.setTimeout(function(){
          $.scrollTo(place, 300, {offset: -50});
          $(place).delay(300).effect("highlight", {}, 2000);
        }, 0);
      }
    });
    
    Session.set('reply', undefined);
    e.target.reset();
  }
});

Template.listPage.onCreated(function() {
  var self = this;
  var id = FlowRouter.getParam('id');
  self.autorun(function() {
    self.subscribe('singleList', id);
  });
});
