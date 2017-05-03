AFRAME.registerComponent('program-icon', {
  init: function () {
    this.el.innerHTML = `<a-torus
    radius=".1"
    radiusTubular=".02"
    class="menu-icon"
    text="align:center; zOffset:.1; value:Number"
    color="yellow"></a-torus>`;
  }
});
