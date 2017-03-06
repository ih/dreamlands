import * as DOMHelpers from '../imports/dom-helpers.js';

AFRAME.registerComponent('programming-menu', {
  init: function () {

    let self = this;
    this.menu = DOMHelpers.stringToDomElement(`
      <a-plane visible="false" color="red" height=".3" width=".2" position=".2 0 0" rotation="0 45 0" text="value: menu;">
      </a-plane>
    `);
    this.el.appendChild(this.menu);
    this.el.addEventListener('menudown', (event) => {
      console.log('menu button pushed');
      self.menu.setAttribute('visible', !self.menu.getAttribute('visible'));
    });
  }
});
