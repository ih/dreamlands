AFRAME.registerComponent('menu-item-select', {
  init: function () {
    let self = this;
    // disable when selection has happened until collision is no more
    this.disabled = false;
    this.el.addEventListener('gripclose', (event) => {
      self.isGripping = true;
    });
    this.el.addEventListener('gripopen', (event) => {
      self.isGripping = false;
      self.disabled = false;
    });
    this.el.addEventListener('hit', (event) => {
      if (event.detail.el && event.detail.el.classList.contains('menu-icon')) {
        // console.log('menu icon collision');

        if (!self.disabled && self.isGripping) {
          const menuItem = event.detail.el;
          menuItem.instance.createItem();

          self.disabled = true;
        }
      }
    });
  }
});
