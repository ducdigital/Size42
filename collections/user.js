// Server sided method
if (Meteor.isServer) {
  Meteor.methods({
    editUser : function(user_id,u_name,u_birthdate,u_country){
      Meteor.users.update(
          {_id: user_id},
          { $set: { 'profile' :
                    {
                      name      : u_name,
                      birthdate : u_birthdate,
                      country   : u_country,
                    }
                  } 
          }
        );
      return null;
    }
  });

  Meteor.methods({
    
    /*
    The linkProfiletoUser() will return the Users profile with all his measurements
    */    
    linkProfiletoUser: function(user_id, profile_id){
    var user = Meteor.users.findOne({_id: user_id});

    var filter = [];
    
    if(user.measure_profile !== 'undefined'){
      filter = _.filter(user.measure_profile, function(obj){ 
        return (obj != profile_id);
      });
    }
    filter.push(profile_id);
    
    Meteor.users.update(
      {_id: user_id},
      { $set: { 'measure_profile': filter } }
    );
    
    return null;
  },
  
  unlinkProfiletoUser: function(user_id, profile_id){
    var user = Meteor.users.findOne({_id: user_id});
    var filter = [];
    if(user.measure_profile !== 'undefined'){
      filter = _.filter(user.measure_profile, function(obj){ 
        return (obj != profile_id);
      });
    }
        
    Meteor.users.update(
      {_id: user_id},
      { $set: { 'measure_profile': filter } }
    );
    
    return null;
  }
  });
}
