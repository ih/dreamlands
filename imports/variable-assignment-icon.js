import * as DOMHelpers from '../imports/dom-helpers.js';

AFRAME.registerComponent('variable-assignment-icon', {
  init: function () {
    this.el.innerHTML = `
      <a-octahedron
        class="menu-icon"
        radius=".1"
        position="0 .12 0"
        color="blue"
        text="value:assignment; align:center; zOffset:.1">
        <a-sphere
          radius=".1"
          color="yellow"
          material="transparent:true; opacity: .5"
          position=".12 0 0">
        </a-sphere>
      </a-octahedron>
    `;
    DOMHelpers.addReadyEvent(this.el, [{entity: this.el, event: 'loaded'}]);
  }
});
