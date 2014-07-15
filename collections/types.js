Types = new Meteor.Collection('cloth_types');

Meteor.methods({
	addAllTypes: function() {
		Types.insert({'name': "Anorak", "_id": "anorak"});
		Types.insert({'name': "Belt", "_id": "belt"});
		Types.insert({'name': "Bowties", "_id": "bowties"});
		Types.insert({'name': "Boxer", "_id": "boxer"});
		Types.insert({'name': "Bra", "_id": "bra"});
		Types.insert({'name': "Dress", "_id": "bustier_f"});
		Types.insert({'name': "Cap", "_id": "cap"});
		Types.insert({'name': "Hat", "_id": "cap2"});
		Types.insert({'name': "Dress", "_id": "dress"});
		Types.insert({'name': "Flips Flops", "_id": "flip flops"});
		Types.insert({'name': "Gloves", "_id": "gloves"});
		Types.insert({'name': "Hat", "_id": "hat_f"});
		Types.insert({'name': "Hoodies", "_id": "hoodie"});
		Types.insert({'name': "Jacket", "_id": "jacket"});
		Types.insert({'name': "Jacket", "_id": "jacket2"});
		Types.insert({'name': "Jacket", "_id": "jacket_f"});
		Types.insert({'name': "Long Shirts", "_id": "long shirt"});
		Types.insert({'name': "Pajamas", "_id": "nightie_f"});
		Types.insert({'name': "Pants", "_id": "pants"});
		Types.insert({'name': "Polo", "_id": "polo"});
		Types.insert({'name': "Scarf", "_id": "scarf"});
		Types.insert({'name': "T-shirt", "_id": "shirt with short sleeves"});
		Types.insert({'name': "High heel", "_id": "shoe_f"});
		Types.insert({'name': "Shoes", "_id": "shoe_h"});
		Types.insert({'name': "Short", "_id": "short"});
		Types.insert({'name': "Skirt", "_id": "skirt"});
		Types.insert({'name': "Underware", "_id": "slip"});
		Types.insert({'name': "Socks", "_id": "socks"});
		Types.insert({'name': "Sport Shoes", "_id": "sport shoes"});
		Types.insert({'name': "T-String", "_id": "string_f"});
		Types.insert({'name': "Suit", "_id": "suit"});
		Types.insert({'name': "Tank-top", "_id": "tanktop"});
		Types.insert({'name': "Tie", "_id": "tie"});
		Types.insert({'name': "Top", "_id": "top_f"});
		Types.insert({'name': "T-Shirt", "_id": "tshirt"});
		Types.insert({'name': "Watches", "_id": "watch"});
	}
});
