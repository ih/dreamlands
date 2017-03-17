AFRAME.registerComponent('environment-icon', {
    init: function () {
      this.el.innerHTML = `<a-box class="menu-icon" radius=".1" text="value:environment;align:center;color:red;side:double" position="0 .12 0" wireframe="true">
        </a-box>`;
    }
});
