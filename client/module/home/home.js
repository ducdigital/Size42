Template.home.helpers({
  products: function() {
    return "";
  }
});

Template.home.events({
  'click #add_product': function(event, template){
    var newproductname = document.getElementById("product_name").value;
    Meteor.call("addProduct",newproductname);
  }
});

Template.product.events({
  'click input.delete': function(event, template){
     Meteor.call("deleteProduct", this._id);
  }
});
