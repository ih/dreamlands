import * as DOMHelpers from '../imports/dom-helpers.js';
import * as Utility from '../imports/utility.js';

AFRAME.registerComponent('binary-operator-menu-item', {
    init: function () {
      var self = this;
      this.itemIcon = DOMHelpers.stringToDomElement(`
        <a-box class="menu-icon" depth=".1" height=".1" width=".1" text="value:operator;align:center;color:red;side:double" position="0 .12 0">
          <a-sphere radius=".1" color="yellow" material="transparent:true; opacity:.5;" position=".12 0 0"></a-sphere>
          <a-sphere radius=".1" color="yellow" material="transparent:true; opacity:.5;" position="-.12 0 0"></a-sphere>
        </a-box>
      `);

      // create the actual item if the icon is selected
      // TODO make sure there is only one eventlistener (same for number-menu-item)
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
      let binaryOperator = DOMHelpers.stringToDomElement(`
        <a-box class="collidable" stretchable grabbable depth=".1" height=".1" width=".1" text="value:operator;align:center;color:red;side:double">
          <a-sphere snap-site="controller:#right-hand" radius=".1" color="yellow" material="transparent:true; opacity:.5;" position=".22 0 0"></a-sphere>
          <a-sphere snap-site="controller:#right-hand" radius=".1" color="yellow" material="transparent:true; opacity:.5;" position="-.22 0 0"></a-sphere>
        </a-box>
      `);

      // set the position of the new item to be where the icon is in the world
      binaryOperator.setAttribute('position', Utility.getWorldPosition(this.itemIcon));
      this.el.sceneEl.appendChild(binaryOperator);
    }
});
