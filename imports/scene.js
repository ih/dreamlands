let scene;
document.addEventListener('DOMContentLoaded', () => {
  scene = document.querySelector('a-scene');
});

// bug if scene has not been set when this is called
export async function appendChild(node) {
  return new Promise(resolve => {
    let appendedNode;
    node.addEventListener('loaded', () => {
      resolve(appendedNode);
    });
    appendedNode = scene.appendChild(node);
  });
}