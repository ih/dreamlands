import { Output } from './output';

export class Syntax {
  constructor() {
    this.output = new Output();
  }

  async render() {
    await this.output.render();
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
