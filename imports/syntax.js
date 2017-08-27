AFRAME.registerComponent('syntax', {
  init: function () {
    this.el.setAttribute('grabbable', true);
    this.el.classList.add('collidable');
    this.el.classList.add('syntax');
  }
});
