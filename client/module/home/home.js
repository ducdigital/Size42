Template.home.helpers({
  products: function() {
    return "";
  }
});

Template.home.events({
  'click #add_product': function(event, template){
    var newproductname = $("#product_name").val();
    Meteor.call("addProduct",newproductname);
  }
});
