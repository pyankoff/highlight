var list, w, h;
var initializing = true;

var _makeCard = function(id) {
  $('.'+id).draggable({
    containment: 'parent',
    cursor: 'move',
    start: function(e) {
      var maxZ = Session.get('maxZ') + 1;
      $(e.target).css('z-index', maxZ);
      Session.set('maxZ', maxZ);

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
  var size = 90 / Math.sqrt($('.'+id).text().length);
  $('.'+id).css('font-size', size+'px');
};

Template.graph.onRendered(function () {
  Session.set('maxZ', 0)
  list = Lists.findOne();
  h = $('#pointGraph').height();
  w = $('#pointGraph').width();

  list.points.forEach((point) => {
    $('.'+point.id).offset({ left: point.place.x*w, top: point.place.y*h });
    _makeCard(point.id);
  });

  initializing = true;
  Points.find().observeChanges({
    added: function(id) {
      if (!initializing) {
        Meteor.setTimeout(function () {
          _makeCard(id);
          $('.'+id).offset({ left: 0.5*w, top: 0.5*h })
          $('.'+id).effect("highlight", {}, 2000);
          $('.'+id).css('z-index', maxZ);
        }, 10);
      }
    }
  });
  initializing = false;
});

Template.graph.onDestroyed(function () {
  initializing = true;
});

Template.graph.events({
  "click #pointGraph": function(e){
     if (!$(e.target).hasClass('graph-point')) {
       Session.set('selected', undefined);
     }
  }
});
