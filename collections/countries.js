Countries = new Meteor.Collection('countries');

Meteor.methods({
	addAllCountries: function() {
	    Countries.insert({'name': 'USA'});
	    Countries.insert({'name': 'France'});
	    Countries.insert({'name': 'Germany'});
	    Countries.insert({'name': 'Italy'});
	    Countries.insert({'name': 'Spain'});
	    Countries.insert({'name': 'UK'});
	    Countries.insert({'name': 'Europe'});
	}
});