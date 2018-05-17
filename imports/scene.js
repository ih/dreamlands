import * as DOMHelpers from '../imports/dom-helpers.js';
let scene;
document.addEventListener('DOMContentLoaded', () => {
  scene = document.querySelector('a-scene');
});

// bug if scene has not been set when this is called
export async function appendChild(node) {
  return DOMHelpers.appendChild(scene, node);
}