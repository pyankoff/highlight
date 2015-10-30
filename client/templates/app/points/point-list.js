Template.pointList.onRendered(function () {
  var pointList = document.getElementById('pointList');

  var pointIds = this.data.map((point) => {
    return point._id;
  });

  Session.set('ids', pointIds);

  var sortable = Sortable.create(pointList, {
    animation: 200,
    handle: ".fa-bars",
    onSort: function (e) {
      var pointIds = Session.get('ids');
      pointIds.splice(e.newIndex, 0, pointIds.splice(e.oldIndex,1)[0]);
      Session.set('ids', pointIds);

      var listId = Session.get("listId");
      if (listId) {
        Meteor.call('updateList', listId, pointIds);
      }
    }
  });
});
