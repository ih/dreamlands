/**
 * Keyboard bindings to control controller and create actions via events.
 * Position controllers in front of camera.
 * <a-scene debug-controller> ?debug in URL to toggle on.
 * https://gist.github.com/ngokevin/803e68351f70139da51fda48d3b484e3
 */
AFRAME.registerComponent('debug-controller', {
  schema: {
    enabled: { default: true }
  },

  init: function () {
    var primaryHand;
    var secondaryHand;

    if (!this.data.enabled && !AFRAME.utils.getUrlParameter('debug')) { return; }

    console.log('%c debug-controller enabled ', 'background: #111; color: red');

    this.isTriggerDown = false;

    primaryHand = document.getElementById('right-hand');
    secondaryHand = document.getElementById('left-hand');

    secondaryHand.setAttribute('position', { x: -0.2, y: 1.5, z: -0.5 });
    primaryHand.setAttribute('position', { x: 0.2, y: 1.5, z: -0.5 });
    secondaryHand.setAttribute('rotation', { x: 35, y: 0, z: 0 });
    primaryHand.setAttribute('rotation', { x: 35, y: 0, z: 0 });

    document.addEventListener('keydown', evt => {
      var primaryPosition;
      var primaryRotation;

      // <shift> + * for everything.
      if (!evt.shiftKey) { return; }

      // <space> for trigger.
      if (evt.keyCode === 32) {
        if (this.isTriggerDown) {
          secondaryHand.emit('menudown');
          this.isTriggerDown = false;
        } else {
          secondaryHand.emit('menuup');
          this.isTriggerDown = true;
        }
        return;
      }

      // Position bindings.
      primaryPosition = primaryHand.getAttribute('position');
      if (evt.keyCode === 72) { primaryPosition.x -= 0.01 }  // h.
      if (evt.keyCode === 74) { primaryPosition.y -= 0.01 }  // j.
      if (evt.keyCode === 75) { primaryPosition.y += 0.01 }  // k.
      if (evt.keyCode === 76) { primaryPosition.x += 0.01 }  // l.
      if (evt.keyCode === 59 || evt.keyCode === 186) { primaryPosition.z -= 0.01 }  // ;.
      if (evt.keyCode === 222) { primaryPosition.z += 0.01 }  // ;.

      // Rotation bindings.
      primaryRotation = primaryHand.getAttribute('rotation');
      if (evt.keyCode === 89) { primaryRotation.x -= 10 }  // y.
      if (evt.keyCode === 79) { primaryRotation.x += 10 }  // o.

      primaryHand.setAttribute('position', AFRAME.utils.clone(primaryPosition));
      primaryHand.setAttribute('rotation', AFRAME.utils.clone(primaryRotation));
    });
  }
});
