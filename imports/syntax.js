import { Output } from './output';

export class Syntax {
  constructor() {
    this.output = new Output();
  }

  async render(parent) {
    // createRenderedElement is implemented by classes that
    // extend Syntax
    console.assert(this.createRenderedElement);
    await this.createRenderedElement(parent);
    console.assert(this.renderedElement);
    await this.output.render(this.renderedElement);
    this.renderedElement.setAttribute('grabbable', true);
    this.renderedElement.classList.add('collidable');
    this.renderedElement.classList.add('snappable');
  }
}

AFRAME.registerComponent('syntax', {
  init: function () {
    if (this.el.getAttribute('snapped')) {
      this.el.removeAttribute('grabbable');
      this.el.classList.remove('snappable');
      this.el.classList.remove('collidable');
    } else {
      this.el.setAttribute('grabbable', true);
      this.el.classList.add('collidable');
      this.el.classList.add('snappable');
    }
    this.el.classList.add('syntax');
  }
});
