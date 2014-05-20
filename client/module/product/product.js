Template.product.helpers({
    product_id: function() {
        return this._id;
    }
});

Template.product.items = function(){
  return Products.findOne({_id: this._id});
}

Template.product.events({
  'click input.delete': function(event, template){
     Meteor.call("deleteProduct", this._id);
  }
});
