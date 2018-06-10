import * as DOMHelpers from '../imports/dom-helpers.js';
import * as Scene from '../imports/scene.js';
import { Syntax } from './syntax';

export class Number extends Syntax {
  constructor(value = 1) {
    super();
    this.value = value;
  }

  async createRenderedElement(parent) {
    console.log('rendering number');
    let numberElement = DOMHelpers.stringToDomElement(`
    <a-sphere color="red" radius=".1" class="snappable" text="value:${this.value};align:center;zOffset:.1"></a-sphere>
    `);
    numberElement.addEventListener('loaded', () => {
      console.log('number loaded');
    });
    console.log('going to append number');
    // document.querySelector('a-scene').appendChild(numberElement);
    this.renderedElement = await DOMHelpers.appendChild(parent, numberElement);
    console.log('number appended');
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
