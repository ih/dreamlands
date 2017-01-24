import * as Entities from '../imports/entities.js';

export function addKeyboardEvents() {
  var onKeyDown = (event) => {
    switch (event.key) {
    case 'c':
    case 'C':
      Entities.createEntity();
      break;
    }
  };
  document.addEventListener('keydown', onKeyDown, false);
};
