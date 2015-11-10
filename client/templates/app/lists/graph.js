var maxZ = 1;
Template.graph.onRendered(function () {
  var list = Lists.findOne(),
      h = $('#pointGraph').height(),
      w = $('#pointGraph').width();
  list.points.forEach((point) => {
    $('.'+point.id).offset({ left: point.place.x*w, top: point.place.y*h })
  });

  Points.find().observeChanges({
    added: function(id) {
      Meteor.setTimeout(function () {
        $('.'+id).draggable({
          containment: 'parent',
          cursor: 'move',
          start: function(e) {
            maxZ += 1;
            $(e.target).css('z-index', maxZ);
            $('.'+id).effect("highlight", {}, 2000);
          },
          stop: function(e) {
            var finder = {_id: list._id, 'points.id': id},
                modifier = {$set: {
                  'points.$.place': {
                    x: $(e.target).offset().left/w,
                    y: $(e.target).offset().top/h
                  }
                }};

            Meteor.call('updateList', finder, modifier);
          }
        });

        $('.'+id).effect("highlight", {}, 2000);
        $('.'+id).css('z-index', maxZ);
      }, 10);
    }
  });
});
