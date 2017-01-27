import * as Users from '../imports/users.js';
import * as DomHelpers from '../imports/dom-helpers.js';

AFRAME.registerComponent('user-camera', {
  init: function () {
    this.el.addEventListener('currentUserLoaded', (event) => {
      console.log('user loaded event caught!');
      this.userElement = event.detail;
      this.head = this.userElement.querySelector('[head]');
    });
  },

  tick: function (time, timeDelta) {
    if (this.userElement) {
      this.head.setAttribute('position', this.el.getAttribute('position'));
      this.head.setAttribute('rotation', this.el.getAttribute('rotation'));
    }
  }
})
