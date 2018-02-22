// @ts-check

let root = null;
const LEFT_HAND = 'leftHand';
const RIGHT_HAND = 'rightHand';
const LEFT = 'left';

let handKeyMappings = {
  LEFT_HAND: {
    LEFT: 'a'
  },
  RIGHT_HAND: {

  }
}
export function initialize(initialRoot) {
  root = initialRoot;
}

export function handAction(hand, action, amount) {
  let key = handKeyMappings[hand][action];
  dispatchKeyDown(key, amount);
}

export function dispatchKeyDown(key, repetitions = 1) {
  let keyEvent = new KeyboardEvent('keydown', {key: key});
  for (let i = 0; i < repetitions; i++) {
    root.dispatchEvent(keyEvent);
  }
}

