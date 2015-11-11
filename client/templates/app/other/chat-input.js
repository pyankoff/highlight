Template.chatInput.helpers({

});

Template.chatInput.events({
  "submit .point-input": function(e){
    e.preventDefault();

    var anchor = FlowRouter.getQueryParam('anchor');
    var text = e.target.text.value;
    var range = document.getSelection();
    var keywords = Session.get('keywords');

    var point = {
      name: keywords || text.split(' ').slice(0,2).join(' '),
      text: text,
      anchor: anchor,
      toList: false
    };

    if (!anchor) {
      point.anchor = FlowRouter.getParam('id');
      var list = Lists.findOne(point.anchor);
      if (list.author === Meteor.userId()) {
        point.toList = true;
      } else {
        FlowRouter.go('chat', {}, {anchor: point.anchor});
      }
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
    Session.set('keywords', '');
  },
  "click input": function(e) {
    var s = window.getSelection();

    s.modify("move", "backward", "word");
    s.modify("extend", "forward", "word");

    var word = s.toString();
    if (word != '') {
      var keywords = Session.get('keywords') || '';
      if (!keywords.includes(word)) {
        keywords = keywords + word + ' ';
      } else {
        keywords = keywords.replace(word, '');
      };

      Session.set('keywords', keywords);
    }
  }
});
