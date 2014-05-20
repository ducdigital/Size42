HomeController = RouteController.extend({
  template: 'home',
  
  waitOn: function() {
    return Meteor.subscribe('product-latest-10');
  },


  data: function () {
    data = { items: Products.find({},{sort:{'submittedOn':-1}}) };
    return data;
  },


  onBeforeAction: function(){

  },


  onAfterAction: function(){


  },

  action: function(){
    this.render();
  }
});