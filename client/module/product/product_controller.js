ProductController = RouteController.extend({
  template: 'product',
  
  waitOn: function() {
    return Meteor.subscribe('product-with-id', this.params._id);
  },


  data: function () {
    return Products.findOne(this.params._id);
  },


  onBeforeAction: function(){

  },


  onAfterAction: function(){


  },

  action: function(){
    this.render();
  }
});