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

export function scaleToSize(entity, newSize) {
  let size = getBoundingSize(entity);
  let newScale = newSize/size;
  entity.setAttribute('scale', `${newScale} ${newScale} ${newScale}`);
}

export function getBoundingSize(entity) {
  let mesh = entity.getObject3D('mesh');
  let boundingBox = new THREE.Box3().setFromObject(mesh);
  let size = boundingBox.getSize();
  return Math.max(size.x, size.y, size.z);
}

export function getWorldPosition(entity) {
  let worldPosition = new THREE.Vector3();
  worldPosition.setFromMatrixPosition(entity.object3D.matrixWorld);
  return worldPosition;
}
