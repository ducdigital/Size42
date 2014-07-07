Template.product.events({
  'click input.delete': function(event, template){
     Meteor.call("deleteProduct", this._id);
     Router.go('home');
  }
});

