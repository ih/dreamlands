import * as Users from '../imports/users.js';

AFRAME.registerComponent('user', {
  schema: {type: 'string'},

  init: function () {
    if (this.data === Users.getCurrentUsername()) {
      Users.signalUserControlsUserEntitySync();
    }
  }
});
