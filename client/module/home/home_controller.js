HomeController = RouteController.extend({
  template: 'home',
  
  waitOn: function() {
    return Meteor.subscribe('profile-user');
  },


  data: function () {
    data = { items: Profile.find() };
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