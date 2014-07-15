Meteor.publish('cloth_types', function() {
  return Types.find();
});
