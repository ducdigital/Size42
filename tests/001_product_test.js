var assert = require('assert');
var util = require('util');

suite('Products testing', function() {
  test('using both client and the server', function(done, server, client) {
      server.eval(function() {
        Products.find().observe({
          added: function addedNewProduct(product) {
            emit('product_added', product);
          }
        });

        
      }).once('product_added', function(product) {
        assert.equal(product.productName, "test_product");
        done();
      });

      client.eval(function() {
        Meteor.call('addProduct', "test_product");
      });
  });
});
