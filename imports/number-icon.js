AFRAME.registerComponent('number-icon', {
  init: function () {
    this.el.innerHTML = `<a-sphere radius=".1" class="menu-icon" text="align:center; zOffset:.1; value:Number" color="red"></a-sphere>`;
  }
});
