import {ProgrammingMenu} from '../programming-menu.js';

document.addEventListener('DOMContentLoaded', async () => {
  console.log('testing menu');
  let testMenu = new ProgrammingMenu();

  let scene = document.querySelector('a-scene');
  await testMenu.render(scene);
})