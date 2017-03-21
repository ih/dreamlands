import * as DOMHelpers from '../imports/dom-helpers.js';

AFRAME.registerComponent('output', {
  schema: {
    output: {type: 'string', default: ''},
    // e.g. error will display red text and normal green
    type: {type: 'string', default: ''},
    position: {type: 'string', default: '0 0 0'},
    size: {type: 'number', default: .01}
  },

  init: function () {
    this.output = DOMHelpers.stringToDomElement(
      `<a-icosahedron
        radius="${this.data.size}"
        wireframe="true"
        color="${this.getColor()}"
        position="${this.data.position}">
      </a-icosahedron>`
    );

    this.el.appendChild(this.output);
  },

  update: function () {
    this.output.setAttribute('text', {
      value: this.data.output,
      align: 'center',
      color: 'white',
      side: 'double'
    });

    this.output.setAttribute('color', this.getColor());
  },

  getColor: function () {
    return this.data.type === 'error' ? 'red' : 'green';
  }
});
