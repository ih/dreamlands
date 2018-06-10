import * as DOMHelpers from '../imports/dom-helpers.js';
import * as Utility from '../imports/utility.js';
import { NumberMenuItem } from '../imports/number-menu-item.js';

export class ProgrammingMenu {
  constructor() {
    this.menuItems = [new NumberMenuItem()]
  }

  async render(parent) {
    this.menuElement = DOMHelpers.stringToDomElement(`
      <a-plane class="programming-menu" visible="false" color="red" height=".4" width=".4" position=".2 0 0" rotation="0 45 -90" text="value: menu;">
      </a-plane>`
    );
    this.renderedElement = await DOMHelpers.appendChild(parent, this.menuElement);
    this.menuItems.map((item) => {
      item.render(this.renderedElement);
    });

    this.renderedElement.instance = this;
  }

  toggle = () => {
    this.enabled = !this.enabled;

    this.renderedElement.setAttribute('visible', this.enabled);
  }
}

AFRAME.registerComponent('programming-menu', {
  dependencies: ['aabb-collider', 'menu-item', 'number-menu-item'],

  init: function () {
    this.iconSize = .05;
    this.itemsPerRow = 3;
    this.initX = -.2;
    this.initZ = .06;
    this.initY = -.1;
    this.margin = .2;

    // we add menu-item class to items here instead of on the component definition
    // b/c there's an odd behavior where menu-item might be attached to the plane
    // during initialization and we need this to distinguish the menu items from
    // the menu (see menu-item code) for more details
    this.menu = DOMHelpers.stringToDomElement(`
      <a-plane class="programming-menu" visible="false" color="red" height=".4" width=".4" position=".2 0 0" rotation="0 45 -90" text="value: menu;">
        <a-entity class="menu-item" menu-item="enabled: false; icon: number-icon; item: number;"></a-entity>
        <a-entity class="menu-item" menu-item="enabled: false; icon: binary-operator-icon; item: binary-operator;"></a-entity>
        <!-- a-entity class="menu-item" menu-item="enabled: false; icon: environment-icon; item: environment;"></a-entity -->
        <a-entity class="menu-item" menu-item="enabled: false; icon: variable-assignment-icon; item: variable-assignment;"></a-entity>
        <a-entity class="menu-item" menu-item="enabled: false; icon: variable-icon; item: variable;"></a-entity>
        <a-entity class="menu-item" menu-item="enabled: false; icon: function-icon; item: function;"></a-entity>
        <a-entity class="menu-item" menu-item="enabled: false; icon: program-icon; item: program;"></a-entity>
      </a-plane>
    `);


    this.el.appendChild(this.menu);
    this.processMenutItem = this.processMenuItem.bind(this);
    console.log(`number of children ${this.menu.children.length} `);

    for (let i = 0; i < this.menu.children.length; i++) {
      let menuItem = this.menu.children[i];
      console.log('in the loop');
      menuItem.addEventListener('ready', () => {
        console.log('menu item ready');
        this.processMenuItem(menuItem, i);
      });
    }

    this.menu.addEventListener('loaded', () => {
     console.log(`after load number of children ${this.menu.children.length} `);

    });
    this.enabled = false;
    this.toggle = this.toggle.bind(this);
    this.el.addEventListener('menudown', this.toggle);
  },

  update: function () {
    console.log('updating');
  },

  remove: function () {
    console.log('removing');
  },

  tick: function () {
  },

  toggle: function () {
    this.enabled = !this.enabled;

    this.menu.setAttribute('visible', !this.menu.getAttribute('visible'));

    for (let i = 0; i < this.menu.children.length; i++) {
      let menuItem = this.menu.children[i];
      menuItem.setAttribute('menu-item', 'enabled', this.enabled);
    }
  },

  processMenuItem: function (menuItem, index) {
    let x = ((index % this.itemsPerRow) * this.margin) + this.initX;
    let y = (Math.floor(index / this.itemsPerRow) * this.margin) + this.initY;

    let menuIcon = menuItem.querySelector('.menu-icon');
    Utility.scaleToSize(menuIcon, this.iconSize);
    // position item
    let position = menuIcon.getAttribute('position');
    position.x = x;
    position.y = y;
    position.z = this.initZ;
    menuIcon.setAttribute('position', position);
   }
});
