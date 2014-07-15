Meteor.publish('profile', function() {
  return Profile.find();
});

Meteor.publish('profile-user', function() {
  return Profile.find({
  	'submittedBy': this.userId
  });
});
