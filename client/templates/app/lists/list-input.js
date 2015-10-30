Template.listInput.onRendered(function() {
  $('textarea').focus();
});

Template.listInput.helpers({
  points: function() {

  }
});

Template.listInput.events({
  'keydown textarea': function(e) {
    var go = function(dir) {
      e.preventDefault();

      var currentNote = $(e.target);
      if (dir == 'prev') {
        var goTo = $(currentNote).prev();
      } else if (dir == 'next') {
        if ($(e.target).index() < $('textarea').length - 1) {
          var goTo = $(currentNote).next();
        } else {
          $('#inputs').append('<textarea rows="5" class="form-control"></textarea>');
          var goTo = $('textarea').last();
        };
      }

      var currentText = $(goTo).val();
      $(goTo).focus().val('').val(currentText);
    }

    var textLength = e.target.value.length

    if (textLength === 0 && e.which === 8) {
      go('prev');
      if ($('textarea').length > 1) {
        $(e.target).remove();
      }
    } else if ($(e.target).prop("selectionStart") == 0 && e.which === 38) {
      go('prev');
    } else if ($(e.target).prop("selectionStart") == textLength
          && (e.which === 40 || e.which === 13 || e.which === 9)) {
      go('next');
    };
  },
  'click .btn-success': function (e) {
    var points = _.pluck($('textarea'), 'value');
    Meteor.call("saveListInput", points, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        Bert.alert({
          title: 'New list created',
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-check'
        });

        FlowRouter.go('list', {id: result});
      }
    });
  }
});
