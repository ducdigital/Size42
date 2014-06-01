Profile = new Meteor.Collection('profiles');
/*  Measurement Object
          'body_length':0,
          'sleeves_length':0,
          'shoulders':0,
          'neck':0,
          'chest':0,
          'stomach':0,
          'pants_length':0,
          'hips':0,
          'waist':0,
          'crotch':0,
          'thigh':0,
          'biceps':0,
          'wrist':0,
          'coat_length':0
db = {'chest':0, 'sleeves_length':10, 'neck':0 }
input = {'sleeves_length': 21, 'neck':20}
*/
Meteor.methods({
  
  // Porfile Methods
  /*
    The newProfile() is working. Don't change in this.
    Info: To add new user profile.
  */
  newProfile: function(u_weight, u_length, u_corpulence) {
    
    Profile.insert({
      'submittedOn': new Date(),
      'submittedBy': Meteor.userId(),
      'measurements':{
        'basic':{
          'weigth': u_weight,
          'length': u_length,
          'corpulence': u_corpulence
        },
        'owned_clothes':[],
        'manual_measured':{
        }
      }
    });
    return null;
  },
  /*
    editProfile() not yet define.
  */
  editProfile: function(user_id, profile_id){

    return null;
  },
  /*
    deleteProfile() working fine. Don't change.
    Info:- To delete the exisisting user profile
  */
  deleteProfile: function(profile_id){
    return Profile.remove({_id: profile_id, 'submittedBy': Meteor.userId()});
  },
  /*
    updateProfile() Function is working
  */
  updateProfile: function(profile_id, profile_weight, profile_length, profile_corpulence){
    update_date = {
      'measurements.basic':
        {
          weigth: profile_weight,
          length: profile_length,
          corpulence: profile_corpulence
        }
      };
    Profile.update(
      {_id: profile_id, 'submittedBy': Meteor.userId()},
      { $set: update_date }
    );
    return null;
   
  },
  
  /*
    addOwnedClothtoProfile() is working. Don't change.
    Info:- This is to add new clothes to the user 
  */
  addOwnedClothtoProfile: function(profile_id, userBrand, userCountry, userType, userSize){
    var update_date = {
      'measurements.owned_clothes': {
          _id: new Meteor.Collection.ObjectID()._str,
          brand: userBrand,
          country: userCountry,
          type: userType,
          size: userSize
        }
    };
    Profile.update({_id: profile_id, 'submittedBy': Meteor.userId()}, {$push: update_date});
    return null;
  },
   /*
    addOwnedClothtoProfile() is working. Don't change.
    Info:- This is to UPDATE new clothes to the user 
  */
  updateOwnedCloth: function(profile_id, cloth_id, userBrand, userCountry, userType, userSize){
    var dbmeasure = Profile.findOne({_id: profile_id}).measurements.owned_clothes;
    var filter = _.filter(dbmeasure, function(obj){ 
      return (obj._id != cloth_id);
    });
    filter.push( 
        {
          _id: cloth_id,
          brand: userBrand,
          country: userCountry,
          type: userType,
          size: userSize
        } 
    );
    
    Profile.update(
      {_id: profile_id, 'submittedBy': Meteor.userId()},
      { $set: { 'measurements.owned_clothes': filter } }
    );
    return null;
  },
  
  removeOwnedClothes: function(profile_id, u_brand, u_country, u_type, u_size) {
    var dbmeasure = Profile.findOne({_id: profile_id}).measurements.owned_clothes;
    var filter = _.filter(dbmeasure, function(obj){ 
      return !((obj.brand == u_brand) && (obj.country == u_country) && (obj.type == u_type) && (obj.size == u_size));
    });
    
    Profile.update(
      {_id: profile_id, 'submittedBy': Meteor.userId()},
      { $set: {'measurements.owned_clothes': filter} }
    );
    return null;
  },
  
  // Measurements to Profile Methods
  updateMeasurementstoProfile: function(profile_id, obj){
    // 1st step . Query from DB the profile
    // 2nd step . Join obj with measurement and remove old value from measurement. and put it into an obj
    // 3rd step. Update. { $set: {measurement: newobj} }
    var dbmeasure = Profile.findOne({_id: profile_id}).measurements;
    for(var key in dbmeasure){
      for(var ky in obj){
        if(obj.hasOwnProperty(ky) && dbmeasure.hasOwnProperty(key)){
          if(ky == key){
            delete dbmeasure[key];
          }
        }
      }
    }
    var output = dbmeasure.concat(obj);
    Profile.update(
      {_id: profile_id, 'submittedBy': Meteor.userId()},
      { $set: {'measurements.manual_measured': output} }
    );
    return null;
  },
  
  removeMeasurements: function(name){
    return null;
  }
 
});
