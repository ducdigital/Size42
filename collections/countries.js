Countries = new Meteor.Collection('countries');

Meteor.methods({
	addAllCountries: function() {
	    Countries.insert({'name': 'US'});
	    Countries.insert({'name': 'EU'});
	    Countries.insert({'name': 'CN'});
	}
});