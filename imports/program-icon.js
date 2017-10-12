import * as DOMHelpers from '../imports/dom-helpers.js';

AFRAME.registerComponent('program-icon', {
  init: function () {
    this.el.innerHTML = `<a-torus
    radius=".1"
    radius-tubular=".02"
    class="menu-icon"
    text="align:center; zOffset:.1; value:Program"
    color="yellow"></a-torus>`;
    DOMHelpers.addReadyEvent(this.el, [{entity: this.el, event: 'loaded'}]);
  }
});
