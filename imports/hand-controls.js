import * as Entities from '../imports/entities.js';

export function addHandEvents() {
  let rightHand = document.getElementById('right-hand');
  rightHand.addEventListener('gripclose', (event) => {
      // Entities.createDefaultEntity();
  });
};
