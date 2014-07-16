Brands = new Meteor.Collection('brands');

Meteor.methods({
	addAllBrands: function() {
	    Brands.insert({'name': "Adidas"});
		Brands.insert({'name': "Alain Figaret"});
		Brands.insert({'name': "Aubade"});
		Brands.insert({'name': "Cartier"});
		Brands.insert({'name': "Chanel" });
		Brands.insert({'name': "Converse"});
		Brands.insert({'name': "Crocs"});
		Brands.insert({'name': "Cyrillus"});
		Brands.insert({'name': "Dior" });
		Brands.insert({'name': "Etam"});
		Brands.insert({'name': "Gucci"});
		Brands.insert({'name': "Hermes"});
		Brands.insert({'name': "Kappa"});
		Brands.insert({'name': "Kenzo"});
		Brands.insert({'name': "Kookai"});
		Brands.insert({'name': "Levis"});
		Brands.insert({'name': "Lotto"});
		Brands.insert({'name': "Louis Vuitton"});
		Brands.insert({'name': "Nike"});
		Brands.insert({'name': "Prada"});
		Brands.insert({'name': "Reebok"});
		Brands.insert({'name': "The North Face"});
		Brands.insert({'name': "Valentino"});
		Brands.insert({'name': "Vans"});
		Brands.insert({'name': "Versace"});
		Brands.insert({'name': "Wilson"});
		Brands.insert({'name': "Oakley"});
		Brands.insert({'name': "Puma"});
	}
});