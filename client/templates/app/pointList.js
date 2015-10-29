Template.pointList.onRendered(function () {
  var pointList = document.getElementById('pointList');

  var ids = this.data.map((point) => {
    return point._id;
  });

  Session.set('ids', ids);

  var sortable = Sortable.create(pointList, {
    animation: 200,
    onSort: function (e) {
      var ids = Session.get('ids');
      ids.splice(e.newIndex, 0, ids.splice(e.oldIndex,1)[0]);
      Session.set('ids', ids);
    }
  });
});
