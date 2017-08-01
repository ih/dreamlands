import '../imports/environment-collider.js';
import * as ProgramHelpers from './program-helpers.js';
var entityFactory = require('./helpers').entityFactory;

suite('environemnt-collider component', function () {
  setup(function () {
    this.environment = entityFactory();
    this.environment.setAttribute('envrironment');
    this.scene = document.querySelector('a-scene');
    this.environment.setAttribute('position', { x: 0, y: 0, z: 0 });
  });

  test('syntax element that collides is moved inside', function () {
    let numberElement = ProgramHelpers.createSyntaxElement('number');
    numberElement.setAttribute('position', { x: 0, y: 0, z: 0});
    this.scene.append(numberElement);
  });
});