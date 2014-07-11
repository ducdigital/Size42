BaseStats = new Meteor.Collection('basestats');

/*  
{ 
  weight:
  height:
  corpulance:
  values:	{
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
			}	
}
*/
if(Meteor.isServer){
	Meteor.methods({
	
		/*
		*  Create all base stats
		*/
		createAllBaseStats: function(){
			var chunk = 20;
			var output = Assets.getText("BasicMeasures.csv", function (err, result) {
				if(err){ console.log("Err:" + err); }
	 			//console.log("result inside: " + result);
	 			var array = result.replace( /\n/g, "," ).split(',');
	 			for (var i = 0; i < array.length; i+=chunk) {
	 				//console.log("SLICING ARRAY");
	 				var temparray = array.slice(i,i+chunk);
	 				if (temparray.length > 2) {
		 				console.info(temparray);
		 				var doc = {
		 					"gender": temparray[0],
		 					"weight": parseFloat(temparray[1]),
							"height": parseFloat(temparray[2]),
							"corpulance": parseFloat(temparray[3]),
							"values": {
									"body_length": parseFloat(temparray[4]),
									"coat_length": parseFloat(temparray[5]),
									"waistcoat_length": parseFloat(temparray[6]),
									"sleeve_length": parseFloat(temparray[7]),
									"shoulder": parseFloat(temparray[8]),
									"neck": parseFloat(temparray[9]),
									"chest": parseFloat(temparray[10]),
									"stomach": parseFloat(temparray[11]),
									"pant_length": parseFloat(temparray[12]),
									"hip": parseFloat(temparray[13]),
									"waist": parseFloat(temparray[14]),
									"crotch": parseFloat(temparray[15]),
									"thigh": parseFloat(temparray[16]),
									"bicep": parseFloat(temparray[17]),
									"wrist": parseFloat(temparray[18]),
									"pants_position": parseFloat(temparray[19])
									}	
		 				};
		 				BaseStats.insert(doc, function() {
		 					//console.log("INSERTED IN THE DATABASE");
		 				});
	 				}
				}
			});
		}
	});
}
Meteor.methods({
		/* 
	*  Find base stat by 4 values (gender, weight, length, corpulence)
	*/ 
	findBaseStat: function(gender, weight, length, corpulance){
		var doc = {
				"gender": gender,
				"weight": weight,
				"height": length,
				"corpulance": corpulance
		};
		var myDocument = BaseStats.findOne(doc);
		console.log("Logging my document : " + JSON.stringify(myDocument));
		return myDocument;
	}
}); 	
