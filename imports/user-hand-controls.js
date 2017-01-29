AFRAME.registerComponent('user-hand-controls', {
  schema: {type: 'string'},

  init: function () {
    this.el.addEventListener('currentUserLoaded', (event) => {
      console.log('hands activating');
      this.userElement = event.detail;
      this.hand = this.userElement.querySelector(`[hand=${this.data}]`);
      this.hand.setAttribute('visible', 'true');
      let _this = this;
      document.querySelector('a-scene').addEventListener('exit-vr', function () {
        _this.hand.setAttribute('visible', 'false');
      });
    });
  },

  tick: function (time, timeDelta) {
    if (this.userElement) {
      // this needs to be the position relative to the user instead of world
      // position
      this.hand.setAttribute('position', this.el.getAttribute('position'));
      this.hand.setAttribute('rotation', this.el.getAttribute('rotation'));
    }
  }
});
