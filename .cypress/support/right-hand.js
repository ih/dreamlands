import * as Keyboard from './keyboard';

export function moveLeft(amount = 1) {
  Keyboard.dispatchKeyDown('j', amount);
}