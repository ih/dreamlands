export function initializeCurrentUser() {
  if (Meteor.userId) {

  }
}

export function getDefaultUserString(username) {
  // user component handles persistence since we need to
  // deal w/ the camera OR have camera and user entities be separate but linked
  `
  <a-entity user="name: ${username}">
    <a-entity head geometry="primitive:sphere" scale=".3 .3 .3">
    <a-entity hand="left"></a-entity>
    <a-entity hand="right"></a-entity>
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
