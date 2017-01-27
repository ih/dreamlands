import * as Users from '../imports/users.js';

AFRAME.registerComponent('user', {
  schema: {type: 'string'},

  init: function () {
    if (this.data === Users.getCurrentUsername()) {
      let event = new CustomEvent(
        // detail is a "reserved keyword" here
        'currentUserLoaded', {detail:  this.el}
      );
      sendUserLoadedEvent(event, 'user-camera');
      // load hands when in VR mode
      document.querySelector('a-scene').addEventListener('enter-vr', function () {
        event = new CustomEvent(
          // detail is a "reserved keyword" here
          'currentUserLoaded', {detail:  this.el}
        );
        sendUserLoadedEvent(event, 'left-hand');
        event = new CustomEvent(
          // detail is a "reserved keyword" here
          'currentUserLoaded', {detail:  this.el}
        );
        sendUserLoadedEvent(event, 'right-hand');
      });
    }
  }
});

// controls are either the camera or a hand controller
function sendUserLoadedEvent(event, controlsId) {
  let controlsElement = document.getElementById(controlsId);
  controlsElement.dispatchEvent(event);
}
