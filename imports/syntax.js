AFRAME.registerComponent('syntax', {
  init: function () {
    // if an element is in a snap-site we shouldn't be able to
    // move it around anymore
    if (!this.el.parentNode.getAttribute('snap-site')) {
      this.el.setAttribute('grabbable', true);
      this.el.classList.add('collidable');
      this.el.classList.add('syntax');
    }
  }
});
