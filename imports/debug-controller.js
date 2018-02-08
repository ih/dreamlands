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
    this.isHandMode = false;

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
      if (evt.key === 'Shift') { 
        this.isHandMode = !this.isHandMode;
      }

      if (!this.isHandMode) {
        return;
      }

      // don't move body if in hand mode
      evt.preventDefault();
      evt.stopImmediatePropagation()


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
      if (evt.key === 'j') { primaryPosition.x -= 0.01 }  
      if (evt.key === 'k') { primaryPosition.y -= 0.01 }  
      if (evt.key === 'i') { primaryPosition.y += 0.01 }  
      if (evt.key === 'l') { primaryPosition.x += 0.01 }  
      if (evt.key === 'o') { primaryPosition.z -= 0.01 }  // ;.
      if (evt.key === 'u') { primaryPosition.z += 0.01 }  // ;.

      // Rotation bindings.
      primaryRotation = primaryHand.getAttribute('rotation');
      if (evt.key === 'm') { primaryRotation.x -= 10 }  // y.
      if (evt.key === '.') { primaryRotation.x += 10 }  // o.

      secondaryPosition = secondaryHand.getAttribute('position');
      if (evt.key === 'a') { secondaryPosition.x -= 0.01 }  
      if (evt.key === 's') { secondaryPosition.y -= 0.01 }  
      if (evt.key === 'w') { secondaryPosition.y += 0.01 }  
      if (evt.key === 'd') { secondaryPosition.x += 0.01 }  
      if (evt.key === 'e') { secondaryPosition.z -= 0.01 }  // ;.
      if (evt.key === 'q') { secondaryPosition.z += 0.01 }  // ;.

      // Rotation bindings.
      secondaryRotation = secondaryHand.getAttribute('rotation');
      if (evt.key === 'c') { secondaryRotation.x -= 10 }  // y.
      if (evt.key === 'z') { secondaryRotation.x += 10 }  // o.


      primaryHand.setAttribute('position', AFRAME.utils.clone(primaryPosition));
      primaryHand.setAttribute('rotation', AFRAME.utils.clone(primaryRotation));
      secondaryHand.setAttribute('position', AFRAME.utils.clone(secondaryPosition));
      secondaryHand.setAttribute('rotation', AFRAME.utils.clone(secondaryRotation));

    });
  }
});
