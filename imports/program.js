import * as DOMHelpers from '../imports/dom-helpers.js';
import { Syntax } from './syntax.js';
import { Environment } from './environment.js';

export class Program extends Syntax {
  constructor() {
    super();
  }

  async createRenderedElement(parent) {
    let environment = new Environment();
    let programElement = DOMHelpers.stringToDomElement(`
    <a-torus color="yellow" radius=".1" radius-tubular=".005"></a-torus>
    `);
    this.renderedElement = await DOMHelpers.appendChild(parent, programElement);
    await environment.render(this.renderedElement);

  }
}

AFRAME.registerComponent('program', {
  init: function () {
    this.interval = 1000;

    this.el.innerHTML = `
      <a-entity class="body" environment position="0 -1 0">
      </a-entity>
    `;

    this.label = 'program';

    this.el.setAttribute('geometry', {
      primitive: 'torus',
      radius: .1,
      radiusTubular: .02
    });

    this.el.setAttribute('material', {
      color: 'yellow'
    });

    this.el.setAttribute('grabbable', true);
    this.el.classList.add('collidable');
    this.el.classList.add('program');
    this.el.setAttribute('text', {
      align: 'center',
      zOffset: .1,
      value: `${this.label}`
    });

        // start execution of code in the environment
    this.evaluationId = setInterval(this.evaluate.bind(this), this.interval);
  },

  evaluate: function () {
    let body = this.el.querySelector('.body');
    body.evaluate({});
  }
});
