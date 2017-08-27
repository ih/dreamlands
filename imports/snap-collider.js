import ElementCollider from '../imports/element-collider.js';
import * as Utility from '../imports/utility.js';

AFRAME.registerComponent('snap-collider', {
  schema: {
    controller: {type: 'selector'},
    objects: { default: '.snappable' },
    state: { default: 'collided' },
    levelsToOutside: {default: 2},
    interval: { type: 'number', default: 500 }
  },

  init: function () {
    console.log('snappable-collider initializing');
    this.tick = AFRAME.utils.throttleTick(this.throttledTick, this.data.interval, this);
    this.collider = new ElementCollider(this.el);

    this.data.controller.addEventListener('gripopen', (event) => {
      this.gripOpened = true;
    });

    this.data.controller.addEventListener('gripclose', (event) => {
      this.gripOpened = false;
    });

  },

  throttledTick: function () {
    this.collider.updateBounds();
    let outsideObjects = this.getObjectsOutside();
    this.snapCollidingOnRelease(outsideObjects);
  },

  getObjectsOutside: function () {
    // outsideElement contains both the environment and what it's attached to
    // e.g. function component
    let outsideElement = this.el.parentNode.parentNode;
    let outsideObjects = Array.from(outsideElement.querySelectorAll(`:scope > ${this.data.objects}`));
    // remove the parentNode though e.g. the function entity that contains the environment
    outsideObjects = Utility.arrayRemove(outsideObjects, this.el.parentNode);
    return outsideObjects;
  },

  snapCollidingOnRelease: function (objects) {
    if (!this.gripOpened) {
      return;
    }
    let colliding = objects.filter((object) => {
      return this.collider.isIntersecting(object);
    });

    colliding.map((object) => {
      this.snapItem(object);
    });
  },

  snapItem: function(snappedItem) {
    // resize items
    console.log(`snapping ${snappedItem}`);
    let boundingSize = Utility.getBoundingSize(this.el);
    Utility.scaleToSize(snappedItem, boundingSize * .75);
    // add entity as child to snap-collider and position to center

    snappedItem.setAttribute('position', '0 0 0');
    Utility.appendNode(this.el, snappedItem);

    // important to do this after snappedItem has been moved since changing
    // it's place in the DOM re-initializes the component, it'd be nice if
    // we did this in a way that wasn't sensitive to order of operations
    // TODO make removing adding back certain attributes dynamic
    snappedItem.removeAttribute('grabbable');
    // do this otherwise this item will constantly be triggering snapItem handler
    snappedItem.classList.remove('snappable');
  }
});