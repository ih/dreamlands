AFRAME.registerComponent('menu-item-select', {
  init: function () {
    let self = this;
    // disable when selection has happened until collision is no more
    this.disabled = false;
    this.selectedItemElement = null;
    this.el.addEventListener('gripclose', (event) => {
      self.isGripping = true;
    });
    this.el.addEventListener('gripopen', (event) => {
      self.isGripping = false;
    });
    this.el.addEventListener('hit', (event) => {
      if (event.detail.el && event.detail.el.classList.contains('menu-item')) {
        self.selectedItemElement = event.detail.el;
        if (!self.disabled && self.isGripping) {
          self.selectedItemElement.emit('selected', {el: self.selectedItemElement});
          self.disabled = true;
        }
      } else {
        self.selectedItemElement = null;
        self.disabled = false;
      }
    });
  }
});
