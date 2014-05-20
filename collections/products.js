Products = new Meteor.Collection('products');

Meteor.startup(function () {
    // code to run on server at startup
});
 
// Server side methods. Use for CRUD and other server code.
// Do not put Select here, use publications instead.

Meteor.methods({
  addProduct : function(productName){
    console.log('Adding products');
    var productId = Products.insert({
          'productName' : productName,
          'submittedOn': new Date(),
          'submittedBy' : Meteor.userId()
      });
    return productId;
  },
  deleteProduct: function(id){
    console.log("Delete product id: "+id);
    return Products.remove(id);
  }
});