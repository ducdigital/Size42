Products = new Meteor.Collection('products');

Meteor.startup(function () {
    // code to run on server at startup
});
 
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
  listProduct : function(){
    console.log('Find all products');
    return Products.find({},{sort:{'submittedOn':-1}}).fetch();
  },
  deleteProduct: function(id){
    console.log("Delete product id: "+id);
    return Products.remove(id);
  }
});