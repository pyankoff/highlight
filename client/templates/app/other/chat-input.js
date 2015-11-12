Template.chatInput.helpers({

});

Template.chatInput.events({
  'keypress textarea.input-message': function(e){
    if (e.which === 13) {
      e.preventDefault();

      var anchor = FlowRouter.getQueryParam('anchor');
      var text = e.target.value;
      var range = document.getSelection();

      var hash = text.split('#')[1] || text.substring(0, 20)+'...';

      var point = {
        name: hash,
        text: text,
        anchor: anchor,
        toList: false
      };

      if (!anchor) {
        point.anchor = FlowRouter.getParam('id');
        if (point.anchor) {
          var list = Lists.findOne(point.anchor);
          if (list.author === Meteor.userId()) {
            point.toList = true;
          } else {
            FlowRouter.go('chat', {}, {anchor: point.anchor});
          }
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

      e.target.value = '';
    }
  }
});
