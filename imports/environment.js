import * as DOMHelpers from '../imports/dom-helpers.js';
import * as Utility from '../imports/utility.js';

// environment should never be created on it's own at the scene level , but
// should exist as the child of another element otherwise see
// environment-collider for more details
AFRAME.registerComponent('environment', {
  schema: {
  },

  init: function () {
    if (this.el.parentNode === this.sceneEl) {
      console.error('environment should not be a top level element!');
    }
    var self = this;
    this.interval = 1000;
    this.entities = [];
    // it'd be nice if we could do something like this
    // consider writing a function to do this
    // this.environment = DOMHelpers.stringToDomElement(`
    //   <a-box class="environment collidable" environment-collider="objects: .syntax" stretchable wireframe=true></a-box>
    // `);
    //  this.el.appendChild(this.environment);
    this.el.setAttribute('geometry', {
      primitive: 'box',
      height: .15,
      width: .15,
      depth: .15,
      color: 'white'
    });
    this.el.setAttribute('material', {
      wireframe: true
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
    this.el.setAttribute('class', 'environment collidable');
    this.el.setAttribute('stretchable', true);
    this.el.setAttribute('resizable', {
      geometryDimensions: 'height, width, depth'
    });

    this.context = {};

    // start execution of code in the environment
    this.evaluationId = setInterval(this.evaluate.bind(this), this.interval);

    // update the list of entities inside the environment
    // this event is fired by environment-collider
    // assumes all syntax entities intersecting w/ the environment are
    // included in the event (same for removed event)
    this.el.addEventListener('added', (event) => {
      console.log('added to env');
      let newElement = event.detail.el;
      let relativePosition = Utility.getRelativePosition(newElement, self.el);
      newElement.setAttribute('position', relativePosition);
      self.el.appendChild(newElement);
      self.entities = event.detail.collection;
    });
    // this event is fired by environment-collider
    this.el.addEventListener('removed', (event) => {
      console.log('removed from env');
      let removedElement = event.detail.el;
      let worldPosition = Utility.getWorldPosition(removedElement);
      self.el.parentNode.parentNode.appendChild(removedElement);
      removedElement.setAttribute('position', worldPosition);
      self.entities = event.detail.collection;
    });
  },

  evaluate: async function () {
    console.log('evaluating...');
    // order entities by y coordinate
    this.entities.sort((entity1, entity2) => {
      let entity1Position = entity1.getAttribute('position');
      let entity2Position = entity2.getAttribute('position');
      return entity2Position.y - entity1Position.y;
    });

    for (let entity of this.entities) {
      console.log(`evaluating ${entity.outerHTML}: ${entity.evaluate(this.context)}`);
      await Utility.sleep(this.interval);
    }
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
