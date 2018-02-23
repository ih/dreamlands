// @ts-check

let root = null;
export const LEFT_HAND = 'leftHand';
export const RIGHT_HAND = 'rightHand';
export const LEFT = 'left';
export const MENU = 'menu';

let handMode = false;

let leftHandMap = {};
leftHandMap[LEFT] = 'a';
leftHandMap[MENU] = 'r';

let handKeyMappings = {}
handKeyMappings[LEFT_HAND] = leftHandMap;

export function initialize(initialRoot) {
  root = initialRoot;
}

export function dispatchKeyDown(key, repetitions = 1) {
  let keyEvent = new KeyboardEvent('keydown', {key: key});
  for (let i = 0; i < repetitions; i++) {
    root.dispatchEvent(keyEvent);
  }
}

export function toggleHandMode() {
  dispatchKeyDown('Shift');
  handMode = !handMode;
}

export function handAction(hand, action, amount = 1) {
  if (!handMode) {
    toggleHandMode();
  }
  let key = handKeyMappings[hand][action];
  dispatchKeyDown(key, amount);
}


