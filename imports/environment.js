import * as DOMHelpers from '../imports/dom-helpers.js';
import * as Utility from '../imports/utility.js';

AFRAME.registerComponent('environment', {
  init: function () {
    var self = this;
    this.interval = 5000;
    this.entities = [];
    // it'd be nice if we could do something like this
    // consider writing a function to do this
    // this.environment = DOMHelpers.stringToDomElement(`
    //   <a-box class="environment collidable" environment-collider="objects: .syntax" stretchable wireframe=true></a-box>
    // `);
    //  this.el.appendChild(this.environment);
    this.el.setAttribute('geometry', {
      primitive: 'box',
    });
    this.el.setAttribute('material', {
      wireframe: true
    });
    this.el.setAttribute('environment-collider', {
      objects: '.syntax'
    });
    this.el.setAttribute('class', 'environment collidable');
    this.el.setAttribute('stretchable', true);
    this.el.setAttribute



    // start execution of code in the environment
    this.evaluationId = setInterval(this.evaluate.bind(this), this.interval);

    // update the list of entities inside the environment
    this.el.addEventListener('added', (event) => {
      console.log('added to env');
      let newElement = event.detail.el;
      self.entities = event.detail.collection;
    });
    //
    this.el.addEventListener('removed', (event) => {
      console.log('removed from env');
      let removedElement = event.detail.el;
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
      console.log(`evaluating ${entity.outerHTML}`);
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
