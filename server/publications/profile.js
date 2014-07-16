Meteor.publish('profile', function() {
  return Profile.find();
});

Meteor.reactivePublish('profile-user', function(uid) {
  	if(uid){
		var user = Meteor.users.findOne({_id: uid}, {reactive: true});
		if (user.measure_profile){
		  var profileCursor = Profile.find({
		  	'_id': {$in : user.measure_profile}
		  });
		  return profileCursor;
		}
	}
});
