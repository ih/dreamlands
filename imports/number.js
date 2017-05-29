import * as DOMHelpers from '../imports/dom-helpers.js';

AFRAME.registerComponent('number', {
  init: function () {
    //radius=".1" grabbable class="collidable snappable syntax"></a-sphere
    this.el.setAttribute('grabbable', true);
    this.el.classList.add('collidable');
    this.el.classList.add('syntax');
    this.el.classList.add('snappable');
    this.el.setAttribute('geometry', {
      primitive: 'sphere',
      radius: .1
    });
    this.el.setAttribute('material', {
      color: 'red'
    });
    this.el.setAttribute('output', {
      position: '.15 0 0',
      size: .03
    });
    this.value = '1';
    this.el.setAttribute('text', {
      align: 'center',
      zOffset: .1,
      value: this.value
    });
    this.el.evaluate = this.evaluate.bind(this);
    this.el.getString = this.getString.bind(this);
  },

  evaluate: function () {
    let code = this.getString();
    let output = eval(this.getString());
    this.el.setAttribute('output', {
      output: code
    });
    return output;
  },

  getString: function () {
    return this.value;
  }
});
