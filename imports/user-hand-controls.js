import {pointDifference} from '../imports/utility.js';
AFRAME.registerComponent('user-hand-controls', {
  schema: {type: 'string'},

  init: function () {
    let self = this;
    this.el.addEventListener('currentUserLoaded', (event) => {
      console.log('hands activating');
      self.userElement = event.detail;
      self.hand = this.userElement.querySelector(`[hand=${this.data}]`);
      self.hand.setAttribute('visible', 'true');
      document.querySelector('a-scene').addEventListener('exit-vr', function () {
        self.hand.setAttribute('visible', 'false');
      });
    });
  },

  tick: function (time, timeDelta) {
    if (this.userElement) {
      // this needs to be the position relative to the user instead of world
      // position
      let relativeHandPosition = pointDifference(
        this.el.getAttribute('position'), this.userElement.getAttribute('position'));
      this.hand.setAttribute('position', relativeHandPosition);
      this.hand.setAttribute('rotation', this.el.getAttribute('rotation'));
    }
  }
});
