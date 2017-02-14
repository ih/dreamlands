import * as Users from '../imports/users.js';

AFRAME.registerComponent('user', {
  schema: {type: 'string'},

  init: function () {
    if (this.data === Users.getCurrentUsername()) {
      // have the hand movements of the current user control
      // the avatar's hands
      Users.signalUserControlsUserEntitySync();
    }
  }
});
