AFRAME.registerComponent('variable-icon', {
  init: function () {
      this.el.innerHTML = `
        <a-octahedron class="menu-icon" radius=".1" position="0 .12 0">
        </a-octahedron>
      `;
  }
});
