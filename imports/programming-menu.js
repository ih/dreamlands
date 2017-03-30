import * as DOMHelpers from '../imports/dom-helpers.js';
import * as Utility from '../imports/utility.js';

AFRAME.registerComponent('programming-menu', {
  dependencies: ['aabb-collider', 'menu-item', 'number-menu-item'],

  init: function () {
    let self = this;
    // we add menu-item class to items here instead of on the component definition
    // b/c there's an odd behavior where menu-item might be attached to the plane
    // during initialization and we need this to distinguish the menu items from
    // the menu (see menu-item code) for more details
    this.menu = DOMHelpers.stringToDomElement(`
      <a-plane class="programming-menu" visible="false" color="red" height=".4" width=".4" position=".2 0 0" rotation="0 45 -90" text="value: menu;">
        <a-entity class="menu-item" menu-item="enabled: false; icon: number-icon; item: number;"></a-entity>
        <a-entity class="menu-item" menu-item="enabled: false; icon: binary-operator-icon; item: binary-operator;"></a-entity>
        <a-entity class="menu-item" menu-item="enabled: false; icon: environment-icon; item: environment;"></a-entity>
        <a-entity class="menu-item" menu-item="enabled: false; icon: variable-assignment-icon; item: variable-assignment;"></a-entity>
        <a-entity class="menu-item" menu-item="enabled: false; icon: variable-icon; item: variable;"></a-entity>
        <a-entity class="menu-item" menu-item="enabled: false; icon: function-icon; item: function;"></a-entity>
      </a-plane>
    `);

    this.el.appendChild(this.menu);
    //this.formatMenuItems();
    this.enabled = false;
    this.el.addEventListener('menudown', (event) => {
      console.log('menu button pushed');
      self.toggle();
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

  toggle: function () {
      this.enabled = !this.enabled;

      this.menu.setAttribute('visible', !this.menu.getAttribute('visible'));

      for (let i = 0; i < this.menu.children.length; i++) {
        let menuItem = this.menu.children[i];
        menuItem.setAttribute('menu-item', 'enabled', this.enabled);
      }
  },

  // layout, size, and attach event handlers to menu items
  processMenuItems: function () {
    let targetSize = .05;
    let itemsPerRow = 3;
    let initX = -.2;
    let currentZ = .06;
    let initY = .2;
    let margin = .2;
    let self = this;
    for (let i=0; i < this.menu.children.length; i++) {
      if (i % itemsPerRow === 0) {
        currentX = initX;
      }
      currentY = initY + (-1 * Math.floor(i/itemsPerRow) * margin);
      let menuItem = this.menu.children[i];
      // scale to a set size
      let menuIcon = menuItem.querySelector('.menu-icon');
      Utility.scaleToSize(menuIcon, targetSize);
      // position item
      let position = menuIcon.getAttribute('position');
      position.x = currentX;
      position.y = currentY;
      position.z = currentZ;
      menuIcon.setAttribute('position', position);
      currentX += margin;
    };
    this.menuProcessed = true;
  }
});
