import * as Keyboard from './keyboard';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('a-scene').addEventListener('loaded', () => {
    console.log('hello');
    Keyboard.initialize(document);
    Keyboard.handAction(Keyboard.LEFT_HAND, Keyboard.MENU);
    Keyboard.handAction(Keyboard.RIGHT_HAND, Keyboard.LEFT, 22);
    Keyboard.handAction(Keyboard.RIGHT_HAND, Keyboard.UP, 14);
    Keyboard.handAction(Keyboard.RIGHT_HAND, Keyboard.BACK, 19);
    
  });
});
