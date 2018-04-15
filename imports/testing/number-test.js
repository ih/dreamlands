import {Number} from '../number.js';
document.addEventListener('DOMContentLoaded', async () => {
  console.log('testing number')
  let testNumber = new Number(2);
  await testNumber.render();
});