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
  <a-entity meteor-persist user="${username}" position="${userPosition.x} ${userPosition.y} ${userPosition.z}">
    <a-sphere head="" radius=".2" position="0 0 0" color="${color}">
      <a-circle eye="left" radius=".05" position="-.1 0 -.2" color="black" rotation="180 0 0"></a-circle>
      <a-circle eye="right" radius=".05" position=".1 0 -.2" color="black" rotation="180 0 0"></a-circle>

        <a-cylinder color="${color}" radius=".3" height="1" position="0 -.7 0"></a-cylinder>
    </a-sphere>
    <a-box hand="left"  visible="false" scale=".1 .1 .1" position="-.4 -.5 0" color="${color}"></a-box>
    <a-box hand="right" visible="false" scale=".1 .1 .1" position=".4 -.5 0" color="${color}"></a-box>
  </a-entity>
  `
}

export function getCurrentUsername() {
  if (Meteor.user()) {
    return Meteor.user().username;
  } else {
    return getGuestUsername(Session.get('sessionId'));
  }
}

export function getGuestUsername(guestId) {
  return 'guest' + guestId;
}

export function getUserPosition() {
  return document.querySelector('#user-camera').getAttribute('position');
}

export function signalUserControlsUserEntitySync() {
  let userElement = document.getElementById(getCurrentUsername());
  let event = new CustomEvent(
    // detail is a "reserved keyword" here
    'currentUserLoaded', {detail:  userElement}
  );
  sendUserLoadedEvent(event, 'user-camera');
  // load hands when in VR mode
  document.querySelector('a-scene').addEventListener('enter-vr', function () {
    event = new CustomEvent(
      // detail is a "reserved keyword" here
      'currentUserLoaded', {detail:  userElement}
    );
    sendUserLoadedEvent(event, 'left-hand');
    event = new CustomEvent(
      // detail is a "reserved keyword" here
      'currentUserLoaded', {detail:  userElement}
    );
    sendUserLoadedEvent(event, 'right-hand');
  });
}

// controls are either the camera or a hand controller
function sendUserLoadedEvent(event, controlsId) {
  let controlsElement = document.getElementById(controlsId);
  controlsElement.dispatchEvent(event);
}
