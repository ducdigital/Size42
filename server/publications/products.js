
Meteor.publish('product-latest-10', function() {
  return Products.find({}, {
    sort: {'submittedOn':-1},
    limit: 20
  });
});


Meteor.publish('product-with-id', function(id) {
  return Products.find({_id: id}, {
    limit: 1
  });
});