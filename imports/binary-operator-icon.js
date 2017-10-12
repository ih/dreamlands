import * as DOMHelpers from '../imports/dom-helpers.js';
AFRAME.registerComponent('binary-operator-icon', {
  init: function () {
    this.el.innerHTML = `
      <a-box class="menu-icon" depth=".1" height=".1" width=".1" text="value:operator;align:center;zOffset: .1;side:double" position="0 .12 0" color="green">
      <a-sphere radius=".1" color="yellow" material="transparent:true; opacity:.5;" position=".12 0 0"></a-sphere>
      <a-sphere radius=".1" color="yellow" material="transparent:true; opacity:.5;" position="-.12 0 0"></a-sphere>
      </a-box>
      `;

    DOMHelpers.addReadyEvent(this.el, [{entity: this.el, event: 'loaded'}]);
  }
});
