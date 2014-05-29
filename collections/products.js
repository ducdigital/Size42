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
  },
  /*
    The below function is to link product to the profile in Profile collection.
    Not from the user  collection.--Niraj
  */
  linkProductToProfile: function(profile_id,product_id){
    var profile = Meteor.profile.findOne({_id: profile_id});
    var filter;
     if(profile.measurements !== 'undefined'){
      filter = _.filter(profile.measurements, function(obj){ 
        return (obj != profile_id);
      });
    }
    filter.push(product_id);
   Meteor.Profile.update(
      {_id: profile_id},
      { $set: { 'measurements': filter } }
    );   
  return null;
  
  },
  /*
    The below function is to link product to the profile in Profile collection.
    Not from the user  collection.--Niraj
  */
  unlinkProductToProfile: function(profile_id,product_id){
    var profile = Meteor.Profile.findOne({_id:profile_id});
    
    var filter = _.filter(profile.measurements, function(obj){
      return(obj !== product_id)
    });
    Meteor.Profile.update(
      {_id: profile_id},
      { $set: { 'measurements': filter } }
    );
    return null;
  }
  
  
});