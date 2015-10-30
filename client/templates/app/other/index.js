Template.index.helpers({
  pointsIndex: () => PointsIndex,
  inputOptions: {
    placeholder: "Search...",
    class: "form-control"
  }
});

Template.index.events({
  "click .point-item": function(e){
    if (!$(e.target).hasClass('fa') &&
        !$(e.target).hasClass('btn') &&
        !$(e.target).hasClass('selectize-input') &&
        !$(e.target).is('input')) {
      e.stopImmediatePropagation();

      var cart = Session.get('cart') ? Session.get('cart') : [];
      cart.push(this._id);
      Session.set("cart", cart);
    }
  }
});

Template.index.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('all');
  });
});
