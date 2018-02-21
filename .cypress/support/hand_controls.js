import { Keyboard } from './keyboard';

export class Hand {
  constructor(document, handId) {
    this.hand = document.getElementById(handId);
    this.keyboard = new Keyboard(document);
  }

  moveLeft(amount) {
    // let position = this.hand.getAttribute('position');
    // position.x -= amount;
    // this.hand.setAttribute(position);
    for (let i = 0; i < amount; i++) {
        this.keyboard.dispatchKeyDown('j');
    }
  }
}