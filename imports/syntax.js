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
