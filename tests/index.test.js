/* global assert, setup, suite, test */
require('aframe');
var entityFactory = require('./helpers').entityFactory;

suite('test component', function () {
  var component;
  var el;

  suite('foo property', function () {
    test('is good', function () {
      assert.equal(1, 1);
    });
  });
});