ShareController = RouteController.extend({
  template: 'share',
  
  waitOn: function() {
    return Meteor.subscribe('share-id', this.params._id);
  },


  data: function () {
  	return Shares.findOne(this.params._id);
  },


  onBeforeAction: function(){
  	Session.set("shareResult", false);
  },


  onAfterAction: function(){


  },

  action: function(){
    this.render();
  }
});