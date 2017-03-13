import * as DOMHelpers from '../imports/dom-helpers.js';
import * as Utility from '../imports/utility.js';

AFRAME.registerComponent('programming-menu', {
  dependencies: ['aabb-collider', 'menu-item', 'number-menu-item'],

  init: function () {
    let self = this;
    this.menu = DOMHelpers.stringToDomElement(`
      <a-plane class="programming-menu" visible="false" color="red" height=".3" width=".2" position=".2 0 0" rotation="0 45 -90" text="value: menu;">
        <a-entity class="menu-item" number-menu-item></a-entity>
        <a-entity class="menu-item" binary-operator-menu-item></a-entity>
      </a-plane>
    `);
    //
        // <a-box depth=".1" height=".1" width=".1" class="menu-item">
        //   <a-entity text="value:operand;align:center;color:blue;side:double;" position="0 .12 0"></a-entity>
        // </a-box>
        //         <a-sphere radius=".2" snap-site="controller:#right-hand" class="menu-item" color="yellow" material="transparent:true; opacity:.5;">
        // </a-sphere>
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
    let currentX = -.1;
    let currentZ = .06;
    let margin = .1;
    let self = this;
    for (let i=0; i < this.menu.children.length; i++) {
      let menuItem = this.menu.children[i];
      // scale to a set size
      let menuIcon = menuItem.querySelector('.menu-icon');
      Utility.scaleToSize(menuIcon, targetSize);
      // position item
      let position = menuIcon.getAttribute('position');
      position.x = currentX;
      position.z = currentZ;
      menuIcon.setAttribute('position', position);
      currentX += margin;
    };
    this.menuProcessed = true;
  },

  createNewItem: function (itemElement) {
    let newItem = itemElement.cloneNode(true);
    newItem.setAttribute('grabbable', true);
    newItem.setAttribute('collidable', true);
    newItem.setAttribute('scale', 1);
    // set the new item's position to the menu/controller position which is
    // based on world coordinates
    let itemSelector = document.querySelector('[menu-item-select]');
    newItem.setAttribute('position', itemSelector.getAttribute('position'));
    this.el.sceneEl.appendChild(newItem);
  }
});
