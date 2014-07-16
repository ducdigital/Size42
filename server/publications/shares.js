Meteor.publish('share-id', function(id) {
  return Shares.find({_id: id}, {
    limit: 1
  });
});
