AFRAME.registerComponent('function-icon', {
  init: function () {
    this.el.innerHTML = `
      <a-tetrahedron
        class="menu-icon"
        radius=".1"
        position="0 .12 0"
        color="orange"
        text="value:function; align:center; zOffset:.1">
    `;
  }
});
