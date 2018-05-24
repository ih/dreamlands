import {ProgrammingMenu} from '../programming-menu.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('testing menu');
  let testMenu = new ProgrammingMenu();

  let hand = document.getElementById('left-hand');
  await testMenu.render(hand);
})