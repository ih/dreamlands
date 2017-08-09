import * as DOMHelpers from '../imports/dom-helpers.js';
import * as Utility from '../imports/utility.js';

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
    this.entities = [];
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

    // update the list of entities inside the environment
    // this event is fired by environment-collider
    // assumes all syntax entities intersecting w/ the environment are
    // included in the event (same for removed event)
    this.el.addEventListener('added', (event) => {
      console.log('added to env');
      let newElement = event.detail.el;
      let relativePosition = Utility.getRelativePosition(newElement, self.el);
      newElement.setAttribute('position', relativePosition);
      // TODO this creates a bug since appendChild re-runs initialize for
      // components on the element so e.g. an element like variable assignment
      // with a snap-site that has something snapped will lose it
      self.el.appendChild(newElement);
      self.entities = event.detail.collection;
    });
    // this event is fired by environment-collider
    this.el.addEventListener('removed', (event) => {
      console.log('removed from env');
      let removedElement = event.detail.el;
      self.entities = event.detail.collection;
      // if the removed event was triggered b/c the element become more nested
      // i.e. the parent is no longer the environment
      // don't move it otherwise bring it out of the environment
      if (removedElement.parentElement !== this.el) {
        return;
      }
      let worldPosition = Utility.getWorldPosition(removedElement);
      self.el.parentNode.parentNode.appendChild(removedElement);
      // need to add some margin so doesn't immediately re-collide w/ environment
      removedElement.setAttribute('position', worldPosition);
    });

    this.el.evaluate = this.evaluate.bind(this);
  },

  evaluate: function (context = {}) {
    // console.log('evaluating...');
    // order entities by y coordinate
    this.entities.sort((entity1, entity2) => {
      let entity1Position = entity1.getAttribute('position');
      let entity2Position = entity2.getAttribute('position');
      return entity2Position.y - entity1Position.y;
    });

    for (let entity of this.entities) {
      let value = entity.evaluate(context);
      // console.log(`evaluating ${entity.outerHTML}: ${value}`);
      // await Utility.sleep(this.interval);
    }

    // TODO make a return component
    if (this.entities.length > 0) {
      let lastValue = this.entities[this.entities.length - 1].evaluate(context);
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
