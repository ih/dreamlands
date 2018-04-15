import * as DOMHelpers from '../imports/dom-helpers.js';

class Number {
  constructor(value = 1) {
    this.value = value;
  }

  async display() {
    
  }
}

AFRAME.registerComponent('number', {
  init: function () {
    this.el.setAttribute('syntax', true);

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
    debugger;
    console.log('number initialized');
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
