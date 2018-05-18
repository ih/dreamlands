import { Output } from './output';

export class Syntax {
  constructor() {
    this.output = new Output();
  }

  async render() {
    await this.output.render();
    console.assert(this.createRenderedElement);
    await this.createRenderedElement();
    this.renderedElement.setAttribute('grabbable', true);
    this.renderedElement.classList.add('collidable');
    this.renderedElement.classList.add('snappable');
  }

  afterRender() {
    console.assert(this.renderedElement);

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
