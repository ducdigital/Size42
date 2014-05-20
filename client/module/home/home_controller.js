HomeController = RouteController.extend({
  template: 'home',
  
  waitOn: function() {
    return Meteor.subscribe('products');
  },


  data: function () {
    data = { items: Meteor.Call("listProduct") };
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