Template.addPoint.onRendered(() => {
  Tracker.autorun(function(){
    if (FlowRouter.subsReady()) {
      clusters = Clusters.find().fetch();
      $('#tagSelect').selectize({
        valueField: 'name',
        labelField: 'name',
        searchField: 'name',
        options: [],
        options: clusters,
        create: function(input) {
          Clusters.insert({name: input});
          return {
            name: input
          };
        }
      });
    }
  });
});

Template.addPoint.events({
  "click .save-point": function(e){
    var data = {
      essayId: FlowRouter.getParam('id'),
      htmlString: $('.essay').html(),
      pointId: Session.get('pointId'),
      clusters: $('#tagSelect')[0].selectize.items
    };

    Meteor.call("savePoint", data);

    Bert.alert({
      title: 'Added point',
      type: 'success',
      style: 'growl-top-right',
      icon: 'fa-check'
    });

    $('.add-point').hide();
  }
});

Template.addPoint.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });
});
