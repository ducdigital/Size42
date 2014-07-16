/*var inspect = require('util').inspect;
var _ = require('underscore');
/*
 var output = { 
          'weigth': 55,
          'length': 150,
          'corpulence': 1,
          'body_length':61.6,
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
};
*/


var main = {
 
      'measurements':
  {
        'basic':
        {
          'weigth': 55,
          'length': 150,
          'corpulence': 1,
          'body_length':61.6,
          'sleeves_length':52.3,
          'shoulders':42.6,
          'neck':37.4,
          'chest':93.7,
          'stomach':80.8,
          'pants_length':86,
          'hips':92.9,
          'waist':80.9,
          'crotch':60.7,
          'thigh':54.2,
          'biceps':32,
          'wrist':16.9,
          'coat_length':71.6
        },
        'owned_clothes': [
          {
            'brand': 'Levi',
            'type': 'pants',
            'size': 28,
            'length' : 30,
            'country': 'USA',
            'pants_length': 69.5,
            'waist':68.5,
            'crotch':12,
            'thigh':52.25
          },
          {
            'brand': 'BLABLA',
            'type': 'pants',
            'size': 28,
            'length' : 30,
            'country': 'USA',
            'pants_length': 69.5,
            'waist':74.5,
            'crotch':14,
            'thigh':52.25
          },
          {
            'brand': 'Levi',
            'type': 'pants',
            'size': 30,
            'length' : 30,
            'country': 'USA',
            'pants_length': 69.5,
            'waist':68.5,
            'crotch':16,
            'thigh':52.25
          },
          { 
            'brand': 'Levi',
            'type': 't-shirt',
            'size': 's',
            'country': 'USA', 
            'neck': 37,
            'chest': 89,
            'waist': 74,
            'seat': 93
          },
          { 
            'brand': 'Levi',
            'type': 't-shirt',
            'size': 's',
            'country': 'USA', 
            'neck': 37,
            'chest': 80,
            'waist': 74,
            'seat': 93
          }
        ],
        'manual_measured':
        {
          'body_length':null,
          'sleeves_length':null,
          'shoulders':null,
          'neck':84,
          'chest':null,
          'stomach':null,
          'pants_length':null,
          'hips':null,
          'waist':60,
          'crotch':null,
          'thigh':55,
          'biceps':null,
          'wrist':null,
          'coat_length':null
        }
      }
 };

// ***************************************************************
// AVERAGE of OWNED CLOTH. FUNCTION TESTED AND DONE. DO NOT CHANGE
// ***************************************************************
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

// **********************************************************************
// END of AVERAGE of OWNED CLOTH. FUNCTION TESTED AND DONE. DO NOT CHANGE
// **********************************************************************
