import * as DOMHelpers from '../imports/dom-helpers.js';
import * as Utility from '../imports/utility.js';

AFRAME.registerComponent('snap-site', {
  schema: {
      controller: {type: 'selector'}
  },

  init: function () {
    let self = this;

    this.boundingSize = Utility.getBoundingSize(this.el);

    this.el.setAttribute('aabb-collider', 'objects: .snappable');

    this.data.controller.addEventListener('gripopen', (event) => {
      self.gripOpened = true;
    });

    this.data.controller.addEventListener('gripclose', (event) => {
      self.gripOpened = false;
    });

    this.el.addEventListener('hit', (event) => {
      if (event.detail.el && self.gripOpened && self.el.children.length === 0) {
        console.log('snap item gripped');
        self.snapItem(event.detail.el);
      }
    });
  },

  snapItem: function(snappedItem) {
    // resize items
    Utility.scaleToSize(snappedItem, this.boundingSize * .75);
    // add entity as child to snap-site and position to center
    this.el.appendChild(snappedItem);
    snappedItem.setAttribute('position', '0 0 0');
  }
});
