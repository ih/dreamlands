import * as Keyboard from './keyboard';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('a-scene').addEventListener('loaded', async () => {
    console.log('hello');
    Keyboard.initialize(document);
    await Keyboard.handAction(Keyboard.LEFT_HAND, Keyboard.MENU);
    await Keyboard.handAction(Keyboard.RIGHT_HAND, Keyboard.LEFT, 22);
    await Keyboard.handAction(Keyboard.RIGHT_HAND, Keyboard.UP, 14);
    await Keyboard.handAction(Keyboard.RIGHT_HAND, Keyboard.BACK, 19);
    await Keyboard.handAction(Keyboard.RIGHT_HAND, Keyboard.TRIGGER);
    await Keyboard.handAction(Keyboard.LEFT_HAND, Keyboard.MENU);
    await Keyboard.handAction(Keyboard.RIGHT_HAND, Keyboard.down, 14);
    await Keyboard.handAction(Keyboard.RIGHT_HAND, Keyboard.FORWARD, 16);
  });
});
