BrandCharts = new Meteor.Collection('brandcharts');

/*  
	JSON OBJECT OF THE BRAND CHARTS
	{ 
	name:
	gender:
	type:
	region_size:
		{
		country:
		size:	
		}
	measurements: 
		{
		Waist: (cm)
		Thigh: (cm)
		Hip: (cm)
		Pant Length:
		Inside Leg: (cm)
		Neck: (cm)	
		Chest (cm):
		Collar: (cm)
		Sleeve (cm)
		body length:
		coat length:
		waistcoat length:
		shoulders:
		stomach:
		crotch:
		biceps:
		wrist:
		pants position:
		}
	}
*/
if(Meteor.isServer){
	Meteor.methods({
	/*
	*  Import Brand Charts in the Database through a csv File
	*/
		createAllBrandCharts: function(){
			//Get Header File
			var header = Assets.getText("BrandChartHeaderFile.csv");
			var arrayHeader = header.replace( /\n/g, "," ).split(',');
			var chunk = arrayHeader.length;
			var c = 0;
			for (var i = 0; i < arrayHeader.length; i++) {
				console.log("The array in [" + i + "]: " + arrayHeader[i]);
			};
			var output = Assets.getText("BrandCharts.csv", function (err, result) {
				if(err){
					console.log("Err:" + err);
				}

				var arrayResult = result.replace( /\n/g, "," ).split(',');
				console.log("The length of the array is: " + arrayResult.length);

				//SLICING ARRAY INTO CHUNKS of HEADER COUNT
				for (var i = 0; i < arrayResult.length; i+=chunk) {
					var temparray = arrayResult.slice(i,i+chunk);
					//Check for undefinied objects
					if (temparray.length > 1) {
						console.log("<============================START=====================================>");
						//console.log("My temparray: " + temparray);

						var docRegionSize = [];
						//Loop through every comma separated result and check if a value exists
						//and check from columns 1-7 and if now values exist in there check 9-10 for the Standard Values
						for (c = 1; c <= 7; c++) {

							if(temparray[c] !== "N/A"){
								//Check If a value is a Range. Example 38-40
								// Will give [38, 39, 40]
								if(temparray[c].indexOf("-") != -1) {
									var twoRanges = temparray[c].split('-');
									var rangeSize = parseFloat(twoRanges[1]) - parseFloat(twoRanges[0]);
									var rangeSizeArray = [];
									console.log("The rangeSize: " + rangeSize);
									for(var k = 0; k <= rangeSize; k++) {
										rangeSizeArray.push(k + Math.round(parseFloat(twoRanges[0])));
									}
									var regionDoc = {
										"country" : arrayHeader[c],
										"size" : rangeSizeArray
									}
									docRegionSize.push(regionDoc); 
								} else if (isNaN(temparray[c])){
									var regionDoc = {
										"country" : arrayHeader[c],
										"size" : temparray[c]
									}
									docRegionSize.push(regionDoc); 
								}else {
									var regionDoc = {
									"country" : arrayHeader[c],
									"size" : parseFloat(temparray[c])
									}
									docRegionSize.push(regionDoc); 
								}
							}
						} // END OF FOR LOOP

						//Check if Standard and Size EXIST shift two columns to the right

						if (temparray[c+2] !== "N/A" && temparray[c+3] !== "N/A") {
							var regionDoc = {
								"letterSize" : temparray[c+2],
								"size" : parseFloat(temparray[c+3])
							}
							docRegionSize.push(regionDoc); 
						} else if (temparray[c+2] !== "N/A") {
							var regionDoc = {
								"letterSize" : temparray[c+2]
							}
							docRegionSize.push(regionDoc); 
						} else if (temparray[c+3] !== "N/A") {
							var regionDoc = {
								"size" : parseFloat(temparray[c+3])
							}
							docRegionSize.push(regionDoc); 
						} else {

						};

						var docMeasurements = {};
						for (c = 12; c <= arrayHeader.length; c++) {
							if(temparray[c] !== "N/A" && typeof temparray[c] !== 'undefined') {
								docMeasurements[arrayHeader[c]] = parseFloat(temparray[c]);
							}
						}

						var docBrandChart = {
			 					"name": temparray[0],
			 					"gender": temparray[8],
								"type": temparray[9],
								"region_size": docRegionSize,
								"measurements": docMeasurements
			 				}; // END OF docBrandChart
			 			console.log("THE DOCUMENT BRAND CHART: " + JSON.stringify(docBrandChart));

			 			BrandCharts.insert(docBrandChart, function() {
		 					//console.log("INSERTED IN THE DATABASE");
		 				});
					} // End of if statement of undefined objects
		 			console.log("<============================FINISH=====================================>");
				} //End of Splice For Statement 
			});
		} // End of CreateAllBrandCharts()
	}); // End of Meteor Methods
} // End of If meteor Server

Meteor.methods({
	/* 
	*  Find Brand Chart by the brand name, gender type, type of the item, and an array of measurements
	*  @param brand, gender, type, measurements
	*/ 
	findBrandSize: function(brand, gender, type, size, country){
		console.log("<=====================START FINDING BRAND ===========================>");
		console.log("Brand: " + brand);
		console.log("Gender: " + gender);
		console.log("Brand: " + type);
		console.log("Brand: " + size);
		console.log("Brand: " + country);
		var doc = {	'name' : "Puma", 
					'gender' : "Female",
					'type' : "Shirt",
					'region_size' : { $all : [
										{ $elemMatch : { "country" : "France" , "size" : 34 } }
									]}
					};
		BrandCharts.find(doc);
		console.log("The doc : " + JSON.stringify(doc));
		console.log(BrandCharts.find(doc));
		// var brand = BrandCharts.find({ 	"name" : "Puma", 
		// 								"gender" : "Female",
		// 					  			"type" : "Shirt",
		// 							   "region_size" : { "$all" : [
		// 													{ "$elemMatch" : { "country" : "France" , "size" : 34 } }
		// 												]}
		// 					 });
		//console.log("Logging the FIND BRAND: " + JSON.stringify(brand));
		return null;
	}
});