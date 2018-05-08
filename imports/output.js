import * as DOMHelpers from '../imports/dom-helpers.js';
import * as Scene from '../imports/scene';

export class Output {
  constructor() {
    this.status = 'ok';
  }

  async render() {
    console.log('rendering output');
    let outputElement = DOMHelpers.stringToDomElement(`
    <a-icosahedron
    radius=".3"
    wireframe="true"
    color="${this.color}"
    position="0 0 0"
    class="output">
    </a-icosahedron>
    `);

    this.renderedElement = await Scene.appendChild(outputElement);
  }

  get color() {
    return this.status === 'ok' ? 'green' : 'red';
  }

  set value(newValue) {
    this.renderedElement.setAttribute('text', {
      value: newValue,
      align: 'center',
      color: 'white',
      side: 'double'
    });
  }
}

AFRAME.registerComponent('output', {
  schema: {
    output: {type: 'string', default: ''},
    // e.g. error will display red text and normal green
    type: {type: 'string', default: ''},
    position: {type: 'string', default: '0 0 0'},
    size: {type: 'number', default: .01}
  },

  init: function () {
    // b/c component is re-initialized when an element moves in the dom-helpers
    // we don't want to recreate the element TODO is there a better way to do this?
    this.output = this.el.querySelector('.output');
    if (this.output) {
      return;
    }
    this.output = DOMHelpers.stringToDomElement(
      `<a-icosahedron
      radius="${this.data.size}"
      wireframe="true"
      color="${this.getColor()}"
      position="${this.data.position}"
      class="output">
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

  removed: function () {
    this.removeChild(this.output);
  },

  getColor: function () {
    return this.data.type === 'error' ? 'red' : 'green';
  }
});
