Template.point.helpers({
  selected: function(){
    return this._id == Session.get('selected');
  },
  pointName: function(){
    var name = this.text.split('#')[1];
    if (!name) {
      name = this.text.substring(0, 20) +
              (this.text.substring(21) && '...');
    }
    return name;
  }
});

Template.point.events({
  "mousedown .graph-point": function(e){
    Session.set('selected', this._id);

    var maxZ = Session.get('maxZ') + 1;
    $('.'+this._id).css('z-index', maxZ);
    Session.set('maxZ', maxZ);

    e.stopImmediatePropagation();
  },
  "click .graph-point": function(e){
    e.stopImmediatePropagation();
  },
  "click .fa-times": function(e){
    var id = FlowRouter.getParam('id');
    Meteor.call('removeFromList',
                {listId: id, pointId: this._id},
                function(error, result){
      if(error){
        console.log("error", error);
      } else {
        Bert.alert({
          title: 'Removed point',
          type: 'warning',
          style: 'growl-top-right',
          icon: 'fa-times'
        });
      }
    });
    Session.set('selected', undefined);
  }
});
