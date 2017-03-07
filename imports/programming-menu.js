import * as DOMHelpers from '../imports/dom-helpers.js';

AFRAME.registerComponent('programming-menu', {
  dependencies: ['aabb-collider', 'menu-item'],

  init: function () {
    let self = this;
    this.menu = DOMHelpers.stringToDomElement(`
      <a-plane visible="false" color="red" height=".3" width=".2" position=".2 0 0" rotation="0 45 -90" text="value: menu;">
        <a-box depth="1" height="1" width="1" class="menu-item"></a-box>
        <a-sphere radius="2" menu-item class="menu-item"></a-sphere>
      </a-plane>
    `);
    this.el.appendChild(this.menu);
    //this.formatMenuItems();
    this.el.addEventListener('menudown', (event) => {
      console.log('menu button pushed');
      self.menu.setAttribute('visible', !self.menu.getAttribute('visible'));
    });

  },

  update: function () {

  },

  tick: function () {
    // a hack, figure out how to do this in init/update
    if (!this.menuProcessed) {
      this.processMenuItems();
    }
    //console.log(this.menu.getObject3D('mesh'));
  },

  // layout, size, and attach event handlers to menu items
  processMenuItems: function () {
    let targetSize = .05;
    let currentX = 0;
    let currentZ = .06;
    let margin = .06;
    for (let i=0; i < this.menu.children.length; i++) {
      let menuItem = this.menu.children[i];
      // scale to a set size
      let mesh = menuItem.getObject3D('mesh');
      let boundingBox = new THREE.Box3().setFromObject(mesh);
      let size = boundingBox.getSize();
      size = Math.max(size.x, size.y, size.z);
      let newScale = targetSize/size;
      menuItem.setAttribute('scale', `${newScale} ${newScale} ${newScale}`);
      // position item
      let position = menuItem.getAttribute('position');
      position.x = currentX;
      position.z = currentZ;
      menuItem.setAttribute('position', position);
      currentX += margin;

      // handle when the menu item is selected
      menuItem.addEventListener('selected', (event) => {
        console.log(event.detail.el);
      });
    };
    this.menuProcessed = true;
  }
});
