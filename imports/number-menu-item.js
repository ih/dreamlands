import * as DOMHelpers from '../imports/dom-helpers.js';
import * as Utility from '../imports/utility.js';

AFRAME.registerComponent('number-menu-item', {
    init: function () {
      var self = this;
      this.itemIcon = DOMHelpers.stringToDomElement(`
        <a-sphere class="menu-icon" radius=".1" text="value:operator;align:center;color:red;side:double" position="0 .12 0">
        </a-sphere>
      `);

      // create the actual item if the icon is selected
      this.itemIcon.addEventListener('selected', (event) => {
        console.log(`item selected ${event.detail.el}`);
        self.createNewItem();
      });

      // seems like component can get shifted to the parent at some point during creation
      // so handle that case by making sure this isn't the menu
      if (this.el.classList.contains('menu-item')) {
        this.el.appendChild(this.itemIcon);
      }
    },

    createNewItem: function () {
      let number = DOMHelpers.stringToDomElement(`
      <a-sphere radius=".1" grabbable class="collidable snappable"></a-sphere>
      `);

      // set the position of the new item to be where the icon is in the world
      number.setAttribute('position', Utility.getWorldPosition(this.itemIcon));
      this.el.sceneEl.appendChild(number);
    }
});
