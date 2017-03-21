AFRAME.registerComponent('variable-assignment-icon', {
  init: function () {
    this.el.innerHTML = `
      <a-octahedron class="menu-icon" radius=".1" position="0 .12 0">
        <a-sphere
          radius=".1"
          color="yellow"
          material="transparent:true; opacity: .5"
          position=".12 0 0">
        </a-sphere>
      </a-octahedron>
    `;
  }
});
