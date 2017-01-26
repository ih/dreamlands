import * as Utility from '../imports/utility.js'

export function initializeCurrentUser() {
  if (Meteor.userId) {

  }
}

export function getDefaultUserString(username) {
  // user component handles persistence since we need to
  // deal w/ the camera OR have camera and user entities be separate but linked
  let userPosition = getUserPosition();
  let color = Utility.randomColor();
  return `
  <a-entity user="name: guestj7JgsCzMuABPSuqYK" position="${userPosition.x} 0 ${userPosition.z}">
    <a-sphere head="" radius=".2" position="0 1.6 0" color="${color}">
        <a-cylinder color="${color}" radius=".3" height="1" position="0 -.7 0"></a-cylinder>
    </a-sphere>
    <a-box hand="left" scale=".1 .1 .1" position="-.4 .9 0" color="${color}"></a-box>
    <a-box hand="right" scale=".1 .1 .1" position=".4 .9 0" color="${color}"></a-box>
  </a-entity>
  `
}

export function getCurrentUsername() {
  if (Meteor.user()) {
    return Meteor.user().username;
  } else {
    return getGuestUsername(Meteor.connection._lastSessionId);
  }
}

export function getGuestUsername(guestId) {
  return 'guest' + guestId;
}

export function getUserPosition() {
  return document.querySelector('#user-camera').getAttribute('position');
}
