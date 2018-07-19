import * as DOMHelpers from '../imports/dom-helpers.js';
import * as Utility from '../imports/utility.js';

export class Environment {
  constructor() {

  }

  async render(parent) {
    let environmentElement = DOMHelpers.stringToDomElement(`
    <a-box color="white" material="wireframe: true" depth="1" height="1" width="1"></a-box>
    `);
    this.renderedElement = await DOMHelpers.appendChild(parent, environmentElement);
    debugger
  }
}
// environment should never be created on it's own at the scene level , but
// should exist as the child of another element otherwise see
// environment-collider for more details
AFRAME.registerComponent('environment', {
  schema: {
    height: {default: 1},
    width: {default: 1},
    depth: {default: 1}
  },

  init: function () {
    console.log('initializing an environment');
    if (this.el.parentNode === this.el.sceneEl) {
      console.error('environment should not be a top level element!');
    }
    var self = this;
    this.el.setAttribute('geometry', {
      primitive: 'box',
      height: this.data.height,
      width: this.data.width,
      depth: this.data.depth
    });
    this.el.setAttribute('material', {
      wireframe: true,
      color: 'white'
    });
    this.el.setAttribute('environment-collider', {
      objects: '.syntax',
      parentLevel: this.data.parentLevel
    });
    this.el.setAttribute('text', {
      align: 'center',
      zOffset: .1,
      value: 'environment',
      width: 1
    });
    this.el.classList.add('environment');
    this.el.classList.add('collidable');
    this.el.setAttribute('stretchable', true);
    this.el.setAttribute('resizable', {
      geometryDimensions: 'height, width, depth'
    });

    this.el.evaluate = this.evaluate.bind(this);
  },

  getSyntaxElements: function () {
    return Array.from(this.el.querySelectorAll(':scope > .syntax'));
  },

  evaluate: function (context = {}) {
    let syntaxElements = this.getSyntaxElements();
    // order entities by y coordinate
    syntaxElements.sort((element1, element2) => {
      let element1Position = element1.getAttribute('position');
      let element2Position = element2.getAttribute('position');
      return element2Position.y - element1Position.y;
    });

    for (let element of syntaxElements) {
      let value = element.evaluate(context);
      // console.log(`evaluating ${element.outerHTML}: ${value}`);
      // await Utility.sleep(this.interval);
    }

    // TODO make a return component
    if (syntaxElements.length > 0) {
      let lastValue = syntaxElements[syntaxElements.length - 1].evaluate(context);
      return lastValue;
    }
    return undefined;
  },
  // // consider compiling code into a generator function and using that to
  // // incrementally execute things https://ponyfoo.com/articles/es6-generators-in-depth
  // runLoop: async function () {
  //   this.interval = 1000; // milliseconds
  //
  //   // do a depth first traversal evaluating components as they're encountered
  //   // and displaying the results
  //   // an alternative to maintaining and evaluating each line independently
  //   // is the list is each line along with everything before it, this might
  //   // make it so we don't have to manually keep track of the scope/context when evaluating
  //   while (this.syntaxComponents.length > 0) {
  //     let currentSyntaxComponent = this.syntaxComponents.pop();
  //     let syntaxChildren = this.getSyntaxChildren(currentSyntaxComponent);
  //     if (syntaxChildren.length > 0) {
  //       this.syntaxComponents.push(currentSyntaxComponent);
  //       this.syntaxComponents = this.syntaxComponents.concat(syntaxChildren);
  //     }
  //     this.evaluate(currentSyntaxComponent);
  //     await Utility.sleep(interval);
  //   }
  // }
});
