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
  newProfile: function(name, u_weight, u_length, u_corpulence, gender) {
    
    Profile.insert({
      'name': name,
      'submittedOn': new Date(),
      'submittedBy': Meteor.userId(),
      'measurements':{
        'basic':{
          'weight': Number(u_weight),
          'length': Number(u_length),
          'corpulence': Number(u_corpulence),
          'gender': gender?'Male':'Female'
        },
        'owned_clothes':[],
        'manual_measured':{
        }
      }
    }, function(err, profile_id){
      Meteor.call("linkProfiletoUser", Meteor.userId(), profile_id);
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
    Meteor.call("unlinkProfiletoUser", Meteor.userId(), profile_id);
    return Profile.remove({_id: profile_id, 'submittedBy': Meteor.userId()});
  },
  /*
    updateProfile() Function is working
  */
  updateProfile: function(profile_id, name, profile_weight, profile_length, profile_gender){
    update_date = {
        'name': name,
        'measurements.basic.weight':profile_weight,
        'measurements.basic.length':profile_length,
        'measurements.basic.gender':profile_gender?'Male':'Female'
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

    var dbmeasure = Profile.findOne({_id: profile_id}).measurements.manual_measured;
    var output = _.extend(_.omit(dbmeasure, _.keys(obj)), obj);

    Profile.update(
      {_id: profile_id, 'submittedBy': Meteor.userId()},
      { $set: {'measurements.manual_measured': output} }
    );
    return null;
  },
  
  removeMeasurements: function(profile_id, name){
    var dbmeasure = Profile.findOne({_id: profile_id}).measurements.manual_measured;
    var output = _.omit(dbmeasure, name);
    Profile.update(
      {_id: profile_id, 'submittedBy': Meteor.userId()},
      { $set: {'measurements.manual_measured': output} }
    );
    return null;
  }

});

if(Meteor.isServer){
  Meteor.methods({

    calculateMeasurements: function(profile_id){
      var profile = Profile.findOne({_id: profile_id});
      var manual_measured = profile.measurements.manual_measured;
      var owned_clothes_measurements = [];

      var base_stat = Meteor.call("findBaseStat", 
        profile.measurements.basic.gender, 
        profile.measurements.basic.weight, 
        profile.measurements.basic.length, 
        profile.measurements.basic.corpulence
      );

      profile.measurements.owned_clothes.forEach(function(brandItem){
        var oms = Meteor.call("findBrandSize", brandItem.brand, profile.measurements.basic.gender, brandItem.type, brandItem.size, brandItem.country);
        owned_clothes_measurements.push(oms.measurements);
      });

      var average_cal = function(owned){
        var known_key = [];
        var final_cal = {};
        
        //Find all known keys
        for(var i = 0; i<owned.length; i++){
          known_key.push(_.keys(owned[i])); 
        }
        var known_key_final =  _.chain(known_key).flatten().uniq().value();
        
        //Each object
        _.each(owned, function(v){
          for(var s =0; s<known_key_final.length; s++){ 
            if(v[known_key_final[s]] !== undefined){
              if(final_cal[known_key_final[s]] === undefined){
                final_cal[known_key_final[s]] = v[known_key_final[s]];
                final_cal[known_key_final[s]+"_count"] = 1;
              }
              else{
                final_cal[known_key_final[s]] = 
                  (
                    (final_cal[known_key_final[s]]*final_cal[known_key_final[s]+"_count"])+
                    v[known_key_final[s]]
                  )/
                (final_cal[known_key_final[s]+"_count"]+1);
                final_cal[known_key_final[s]+"_count"]+=1;
              }
            }
          }
        });
        
        //final cleanup
        for (var key in final_cal ) {
          if(key.indexOf("_count") != -1 || key == "length" || isNaN(final_cal[key])){
            delete final_cal[key];
          }
        }
        return final_cal;
          
      }
      var owned_clothes_calculated = average_cal(owned_clothes_measurements);
      _.extend(base_stat.values, owned_clothes_calculated);
      _.extend(base_stat.values, manual_measured);
      return base_stat.values;
    },

    calculateSize: function(profile_id, brand, type, gender){
      var output = [];
      var range = 4;
      var tryCount = 0;
      var maxTryCount = 15;
      var measurements = Meteor.call("calculateMeasurements", profile_id); 
      var brandCharts = BrandCharts.find({"name": brand, "type": type, "gender": gender}).fetch();
      var merged = {};
      _.pluck(brandCharts, 'measurements').forEach(function(item){
        _.extend(merged, item);
      });
      var keys = _.keys(merged);
      while(output.length < 1 && tryCount < maxTryCount){
        var output = _.filter(brandCharts, function(brandsize){ 
          var outresult = true;
          keys.forEach(function(key){
            if(brandsize.measurements[key] < measurements[key]-range || brandsize.measurements[key] > measurements[key]+range ){
              outresult = false;
            }
          });
          return outresult; 
        });
        range++;
        tryCount++;
      }
      return output;
    }
  });
}
