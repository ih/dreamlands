import {Number} from '../number.js';
document.addEventListener('DOMContentLoaded', async () => {
  console.log('testing number')
  let testNumber = new Number(2);
  let scene = document.querySelector('a-scene');
  await testNumber.render(scene);
});