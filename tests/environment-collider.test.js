import '../imports/environment.js';
import '../imports/program.js';
import '../imports/environment-collider.js';
import * as ProgramHelpers from './program-helpers.js';
var entityFactory = require('./helpers').entityFactory;

suite('environment-collider component', function () {
  setup(function () {
    console.log('setting up environment-collider tests');
    this.program = entityFactory();
    this.program.setAttribute('program', '');
    this.scene = document.querySelector('a-scene');
    this.program.setAttribute('position', { x: 0, y: 1, z: 0 });
    this.scene.append(this.program);
  });

  test('syntax element that collides is moved inside', function (done) {
    let numberElement = ProgramHelpers.createSyntaxElement('number');
    numberElement.setAttribute('position', { x: 0, y: 0, z: 0});
    this.program.addEventListener('removed', (event) => {
      expect(event.detail.el).to.equal(numberElement);
      done();
    });
    this.scene.append(numberElement);
  });
});