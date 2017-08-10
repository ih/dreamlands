import ElementCollider from '../imports/element-collider.js';
import * as Utility from '../imports/utility.js';

AFRAME.registerComponent('environment-collider', {
  schema: {
    objects: { default: '' },
    state: { default: 'collided' },
    interval: { type: 'number', default: 500 }
  },

  init: function () {
    console.log('environment-collider initializing');
    this.tick = AFRAME.utils.throttleTick(this.throttledTick, this.data.interval, this);
    this.collider = new ElementCollider(this.el);
  },

  throttledTick: function () {
    let insideObjects = this.getObjectsInsideEnvironment();
    let outsideObjects = this.getObjectsOutsideEnvironment();
    this.removeNonColliding(insideObjects);
    this.addColliding(outsideObjects);
  },

  getObjectsInsideEnvironment: function () {
    return Array.from(this.el.querySelectorAll(`:scope > ${this.data.objects}`));
  },

  getObjectsOutsideEnvironment: function () {
    // outsideElement contains both the environment and what it's attached to
    // e.g. function component
    let outsideElement = this.el.parentNode.parentNode;
    let outsideObjects = Array.from(outsideElement.querySelectorAll(`:scope > ${this.data.objects}`));
    // remove the parentNode though e.g. the function entity that contains the environment
    outsideObjects = Utility.arrayRemove(outsideObjects, this.el.parentNode);
    return outsideObjects;
  },

  removeNonColliding: function (objects) {
   let nonColliding = objects.filter((object) => {
      return !this.isIntersecting(object);
    });

    nonColliding.map((object) => {
      let worldPosition = Utility.getWorldPosition(object);
      this.el.parentNode.parentNode.appendChild(object);
      // need to add some margin so doesn't immediately re-collide w/ environment
      object.setAttribute('position', worldPosition);
      this.el.emit('removed', {el: this.el}, false);
    });
  },

  addColliding: function (objects) {
   let colliding = objects.filter((object) => {
      return this.collider.isIntersecting(object);
    });

    colliding.map((object) => {
      let relativePosition = Utility.getRelativePosition(object, this.el);
      object.setAttribute('position', relativePosition);
      // TODO this creates a bug since appendChild re-runs initialize for
      // components on the element so e.g. an element like variable assignment
      // with a snap-site that has something snapped will lose it
      this.el.appendChild(object);
      this.el.emit('added', {el: this.el}, false);
    });
  }
});