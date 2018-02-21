// @ts-check
export class Keyboard {
  constructor(root) {
    this.root = root;
  }

  dispatchKeyDown(key, repetitions = 1) {
    let keyEvent = new KeyboardEvent('keydown', {key: key});
    this.root.dispatchEvent(keyEvent);
  }
}