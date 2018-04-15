import * as DOMHelpers from '../imports/dom-helpers.js';
import * as Utility from '../imports/utility.js';

AFRAME.registerComponent('menu-item', {
  schema: {
    enabled: {type: 'boolean'},
    icon: {type: 'string'},
    item: {type: 'string'}
  },
  init: function () {
    var self = this;

    this.itemIcon = DOMHelpers.stringToDomElement(`
      <a-entity ${this.data.icon}>
      </a-entity>
      `);

      // create the actual item if the icon is selected
      this.itemIcon.addEventListener('selected', (event) => {
        if (self.data.enabled) {
          console.log(`item selected ${event.detail.el}`);
          self.createNewItem();
        }
      });

      // seems like component can get shifted to the parent at some point during creation
      // so handle that case by making sure this isn't the menu
      if (this.el.classList.contains('menu-item')) {
        this.itemIcon = this.el.appendChild(this.itemIcon);
        DOMHelpers.addReadyEvent(this.el, [{entity: this.itemIcon, event: 'ready'}]);
      }
  },

  createNewItem: function () {
    let item = DOMHelpers.stringToDomElement(`
      <a-entity ${this.data.item}></a-entity>
    `);

    let newPosition = Utility.getWorldPosition(this.itemIcon);
    item = this.el.sceneEl.appendChild(item);
    // set the position of the new item to be where the icon is in the world
    // item.setAttribute('position', `${newPosition.x} ${newPosition.y} ${newPosition.z}`);
    // item.setAttribute('position', newPosition);
    setTimeout(() => {item.object3D.position.set(newPosition.x, newPosition.y, newPosition.z)}, 1000);
  }
});
