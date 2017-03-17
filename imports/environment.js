import * as DOMHelpers from '../imports/dom-helpers';

AFRAME.registerComponent('environment', {
  init: function () {
    var self = this;
    this.environment = DOMHelpers.stringToDomElement(`
      <a-box class="environment collidable" aabb-collider-collection="objects: .syntax" stretchable wireframe=true></a-box>
    `);

    this.el.appendChild(this.environment);

    this.environment.addEventListener('added', (event) => {
      console.log('added to env');
      let newElement = event.detail.el;

    });

    this.environment.addEventListener('removed', (event) => {
      console.log('removed from env');
      let removedElement = event.detail.el;
    });
  },

  runLoop: function () {
    this.interval = 1;
    while (this.statements) {

    }
  }
});
