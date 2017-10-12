import * as DOMHelpers from '../imports/dom-helpers.js';

AFRAME.registerComponent('variable-icon', {
  init: function () {
      this.el.innerHTML = `
        <a-octahedron
          class="menu-icon"
          radius=".1"
          position="0 .12 0"
          color="blue"
          text="value:variable; align:center; zOffset:.1">
        </a-octahedron>
      `;
    DOMHelpers.addReadyEvent(this.el, [{entity: this.el, event: 'loaded'}]);
  }
});
