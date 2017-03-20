import * as DOMHelpers from '../imports/dom-helpers.js';

AFRAME.registerComponent('number', {
  init: function () {
    //radius=".1" grabbable class="collidable snappable syntax"></a-sphere
    this.el.setAttribute('grabbable', true);
    this.el.setAttribute('class', 'collidable snappable syntax');
    this.el.setAttribute('geometry', {
      primitive: 'sphere',
      radius: .1
    });
    this.value = 1;

    this.el.evaluate = this.evaluate.bind(this);
  },

  evaluate: function () {
    return eval(this.getString());
  },

  getString: function () {
    return Number(this.value);
  }
});
