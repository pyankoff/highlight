var list, w, h;
var initializing = true;

function updatePositions(ids) {
  ids.forEach((id) => {
    var position = $('.'+id).offset();

    var x = position.left/w,
        y = position.top/h;

    var finder = {_id: list._id, 'points.id': id},
        modifier = {$set: {
          'points.$.place': {
            x: x,
            y: y
          },
          updatedAt: new Date()
        }};

    Meteor.call('updateList', finder, modifier);
  });
}

var _makeCard = function(id) {
  $('.'+id).draggable({
    containment: 'parent',
    cursor: 'move',
    start: function(e) {
      var maxZ = Session.get('maxZ') + 1;
      $(e.target).css('z-index', maxZ);
      Session.set('maxZ', maxZ);
      Session.set('selected', id);

      $('.'+id).effect("highlight", {}, 2000);
    },
    stop: function(e) {
      updatePositions([id]);
    }
  });
};

Template.graph.onRendered(function () {
  Session.set('maxZ', 0)
  list = Lists.findOne();
  h = $('#pointGraph').height();
  w = $('#pointGraph').width();

  $("#big-ghost").draggable({
    start: function(e) {
      prevX = e.pageX;
      prevY = e.pageY;
    },
    drag: function(e) {
      var selected = Session.get('dragged');
      selected.forEach((id) => {
        var dx = e.pageX - prevX;
        var dy = e.pageY - prevY;

        var prevPosition = $('.'+id).offset();

        $('.'+id).offset({
          'left': prevPosition.left + dx,
          "top": prevPosition.top + dy
        });
      });
      prevX = e.pageX;
      prevY = e.pageY;
    },
    stop: function(e) {
      updatePositions(Session.get('dragged'));
    }
  });
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
          $('.'+id).offset({ left: Math.random()*w, top: Math.random()*h })
          $('.'+id).effect("highlight", {}, 2000);
          $('.'+id).css('z-index', Session.get('maxZ'));
        }, 10);
      }
    }
  });
  initializing = false;
});

Template.graph.onDestroyed(function () {
  initializing = true;
  Session.set('selected', undefined);
});

Template.graph.events({
  "mousedown #pointGraph": function(e){
    $("#big-ghost").hide();
    $(".ghost-select").addClass("ghost-active");
    $(".ghost-select").css({
      'left': e.pageX,
      'top': e.pageY
    });

    initialW = e.pageX;
    initialH = e.pageY;

    Session.set('selected', undefined);
    Session.set('dragging', true);
  },
  "mousemove": function(e){
    if (Session.get('dragging')) {
      var w = Math.abs(initialW - e.pageX);
      var h = Math.abs(initialH - e.pageY);

      $(".ghost-select").css({
        'width': w,
        'height': h
      });
      if (e.pageX <= initialW && e.pageY >= initialH) {
        $(".ghost-select").css({
          'left': e.pageX
        });
      } else if (e.pageY <= initialH && e.pageX >= initialW) {
        $(".ghost-select").css({
          'top': e.pageY
        });
      } else if (e.pageY < initialH && e.pageX < initialW) {
        $(".ghost-select").css({
          'left': e.pageX,
          "top": e.pageY
        });
      }
    }
  },
  "mouseup": function(e){
    if (Session.get('dragging')) {

      var maxX = 0;
      var minX = 5000;
      var maxY = 0;
      var minY = 5000;
      var totalElements = 0;
      var selected = [];
      $(".graph-point").each(function (_, point) {
        var aElem = $(".ghost-select");
        var bElem = $(point);
        var result = doObjectsCollide(aElem, bElem);

        if (result == true) {
          selected.push(bElem.attr('class').split(' ')[1]);
          var aElemPos = bElem.offset();
          var bElemPos = bElem.offset();
          var aW = bElem.width();
          var aH = bElem.height();
          var bW = bElem.width();
          var bH = bElem.height();

          var coords = checkMaxMinPos(aElemPos, bElemPos, aW, aH, bW, bH, maxX, minX, maxY, minY);
          maxX = coords.maxX;
          minX = coords.minX;
          maxY = coords.maxY;
          minY = coords.minY;
          var parent = bElem.parent();

          //console.log(aElem, bElem,maxX, minX, maxY,minY);
          if (bElem.css("left") === "auto" && bElem.css("top") === "auto") {
              bElem.css({
                  'left': parent.css('left'),
                  'top': parent.css('top')
              });
          }

          $("#big-ghost").css({
              'width': maxX + 20 - minX,
              'height': maxY + 20 - minY,
              'top': minY - 10,
              'left': minX - 10
          });
          $("#big-ghost").show();
        }
      });

      $(".ghost-select").removeClass("ghost-active");
      $(".ghost-select").width(0).height(0);

      Session.set('dragged', selected);
      Session.set('dragging', false);
    }
  },
  "click .fa-external-link": function (e) {
    var selected = Session.get('dragged');
    var listId = FlowRouter.getParam('id');
    
    Meteor.call("exportPoints", listId, selected, function(error, result){
      if(error){
        console.log("error", error);
      }
      if(result){
        Bert.alert({
          title: 'Exported new list',
          type: 'success',
          style: 'growl-top-right',
          icon: 'fa-check'
        });
      }
    });
  }
});


function doObjectsCollide(a, b) { // a and b are your objects
    //console.log(a.offset().top,a.position().top, b.position().top, a.width(),a.height(), b.width(),b.height());
    var aTop = a.offset().top;
    var aLeft = a.offset().left;
    var bTop = b.offset().top;
    var bLeft = b.offset().left;

    return !(
        ((aTop + a.height()) < (bTop)) ||
        (aTop > (bTop + b.height())) ||
        ((aLeft + a.width()) < bLeft) ||
        (aLeft > (bLeft + b.width()))
    );
}

function checkMaxMinPos(a, b, aW, aH, bW, bH, maxX, minX, maxY, minY) {
    'use strict';

    if (a.left < b.left) {
        if (a.left < minX) {
            minX = a.left;
        }
    } else {
        if (b.left < minX) {
            minX = b.left;
        }
    }

    if (a.left + aW > b.left + bW) {
        if (a.left > maxX) {
            maxX = a.left + aW;
        }
    } else {
        if (b.left + bW > maxX) {
            maxX = b.left + bW;
        }
    }
    ////////////////////////////////
    if (a.top < b.top) {
        if (a.top < minY) {
            minY = a.top;
        }
    } else {
        if (b.top < minY) {
            minY = b.top;
        }
    }

    if (a.top + aH > b.top + bH) {
        if (a.top > maxY) {
            maxY = a.top + aH;
        }
    } else {
        if (b.top + bH > maxY) {
            maxY = b.top + bH;
        }
    }

    return {
        'maxX': maxX,
        'minX': minX,
        'maxY': maxY,
        'minY': minY
    };
}
