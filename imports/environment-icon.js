AFRAME.registerComponent('environment-icon', {
    init: function () {
      this.el.innerHTML = `<a-box class="menu-icon" color="white" depth=".1" width=".1" height=".1" text="value:environment;align:center;zOffset:.1;side:double;width:1" position="0 .12 0" wireframe="true">
        </a-box>`;
    }
});
