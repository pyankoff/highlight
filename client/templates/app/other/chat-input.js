Template.chatInput.events({
  "submit .point-input": function(e){
    e.preventDefault();

    var anchor = FlowRouter.getQueryParam('anchor');
    var text = e.target.text.value;

    if (!anchor) {
      anchor = FlowRouter.getParam('id');
      FlowRouter.go('chat', {}, {anchor: anchor});
    };

    var point = {
      text: text,
      anchor: anchor
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
