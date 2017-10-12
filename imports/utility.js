// http://www.paulirish.com/2009/random-hex-color-code-snippets/
export function randomColor() {
  return '#' + (function co(lor){
    return (lor +=
            [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
      && (lor.length == 6) ?  lor : co(lor); })('');
}

export function distance(point1, point2) {
  return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2));
}

export function pointDifference(point1, point2) {
  return {
    x: point1.x - point2.x,
    y: point1.y - point2.y,
    z: point1.z - point2.z
  };
}

export function pointSum(point1, point2) {
  return {
    x: point1.x + point2.x,
    y: point1.y + point2.y,
    z: poitn1.z + point2.z
  };
}

export function scaleToSize(entity, newSize) {
  let size = getBoundingSize(entity);
  let newScale = newSize/size;
  entity.setAttribute('scale', `${newScale} ${newScale} ${newScale}`);
}

export function getBoundingSize(entity) {
  let object3D = getGeometryGroup(entity.object3D);
  // let object3D = entity.getObject3D('mesh');
  let boundingBox = new THREE.Box3().setFromObject(object3D);
  let size = boundingBox.getSize();
  return Math.max(size.x, size.y, size.z);
}

// extract only the nodes in object3D that have a geometry
// i.e. aren't a group
export function getGeometryGroup(object3D) {
  let geometryGroup = new THREE.Group();
  let queue = [object3D];
  while (queue.length > 0) {
    let node = queue.shift();
    // text geometry doesn't behave well with bounding boxes
    if (node.geometry && node.geometry.constructor.name !== 'TextGeometry') {
      geometryGroup.add(node.clone());
    }
    queue = queue.concat(node.children);
  }
  return geometryGroup;
}

export function getWorldPosition(entity) {
  let worldPosition = new THREE.Vector3();
  worldPosition.setFromMatrixPosition(entity.object3D.matrixWorld);
  return worldPosition;
}

export function getRelativePosition(entity, referenceEntity) {
    let entityWorldPosition = this.getWorldPosition(entity);
    let referenceWorldPosition = this.getWorldPosition(referenceEntity);
    return this.pointDifference(entityWorldPosition, referenceWorldPosition);
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// from http://stackoverflow.com/a/40109254
export function evaluate(code, context) {
    // execute script in private context
    return (new Function(`with(this) { return ${code}}`)).call(context);
}

export function arrayRemove(array, item) {
  return array.filter((currentItem) => {
      return currentItem !== item;
  });
}

export function copyContext(object) {
  return JSON.parse(JSON.stringify(object));
}

export function appendChildOutsideIn(newParent, child) {
  child.classList.remove('syntax');
  let queue = [[child, newParent]];
  while (queue.length > 0) {
    let [currentNode, newParent] = queue.pop();
    let newChild = currentNode.cloneNode(false);
    let parent = newParent.appendChild(newChild);
    for (let i = 0; i < currentNode.children.length; i++) {
      let childNode = currentNode.children[i];
      queue.push([childNode, parent]);
    }
  }
  // seems like a-entity wraps remove and takes an argument
  // that's why we use removeChild
  child.parentNode.removeChild(child);
}

export function appendNode(parentNode, newNode) {
  let newClone = newNode.cloneNode(false);
  function appendChildren(event) {
    console.log(`calling appendChildren for ${newClone.outerHTML}`);
    // remove children of the clone and replace with the original
    while (newClone.firstChild) {
      newClone.removeChild(newClone.firstChild);
    }
    for (let child of newNode.getChildren()) {
      appendNode(newClone, child);
    }
    newClone.removeEventListener('loaded', appendChildren);
  }
  newClone.addEventListener('loaded', appendChildren);
  console.log('appending ' + newClone.outerHTML);
  newNode.parentNode.removeChild(newNode);
  return parentNode.appendChild(newClone);
}