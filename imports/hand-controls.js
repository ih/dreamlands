import * as Entities from '../imports/entities.js';

export function addHandEvents() {
  let rightHand = document.getElementById('right-hand');
  rightHand.addEventListener('gripclose', (event) => {
      // Entities.createDefaultEntity();
  });

  addProgrammingMenuToggle();
};

function addProgrammingMenuToggle() {
  let leftHand = document.getElementById('left-hand');
  let programmingMenu = leftHand.querySelector('.programming-menu');
  console.assert(programmingMenu);
  leftHand.addEventListener('menudown', () => {
    programmingMenu.instance.toggle();
  });
}
