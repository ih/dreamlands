export class Hand {
  constructor(document, handId) {
    this.hand = document.getElementById(handId);
  }

  moveLeft(amount) {
    let position = this.hand.getAttribute('position');
    position.x -= amount;
    this.hand.setAttribute(position);
  }
}