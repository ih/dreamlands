import * as Utility from '../imports/utility.js';
// assume the object to follow is a sibling
AFRAME.registerComponent('follow', {

  schema: {default: ''},

  init: function () {
    this.objectToFollow = this.el.parentEl.querySelector(this.data);
    this.positionDelta = Utility.pointDifference(
      this.el.getAttribute('position'),
      this.objectToFollow.getAttribute('position'));
  },

  tick: function (time, timeDelta) {
    let newPosition = Utility.pointSum(
      this.objectToFollow.getAttribute('position'),
      this.positionDelta);
    this.el.setAttribute('position', newPosition);
  }
});
