export default class ElementCollider {
  constructor(element) {
    this.element = element;
    this.mesh = this.element.getObject3D('mesh');
    // this is reused by both the element for this collider
    // as well for any element it is being checked for collisions with
    this.boundingBox = new THREE.Box3();
    this.elementMax = new THREE.Vector3();
    this.elementMin = new THREE.Vector3();
    this.updateBounds();
  }

  isIntersecting(otherElement) {
    let otherMesh = otherElement.getObject3D('mesh');
    this.boundingBox.setFromObject(otherMesh);
    let otherMax = this.boundingBox.max;
    let otherMin = this.boundingBox.min;
    let intersected = (this.elementMin.x <= otherMax.x && this.elementMax.x >= otherMin.x) &&
      (this.elementMin.y <= otherMax.y && this.elementMax.y >= otherMin.y) &&
      (this.elementMin.z <= otherMax.z && this.elementMax.z >= otherMin.z);

    return intersected;
  }

  updateBounds() {
    this.boundingBox.setFromObject(this.mesh);
    this.elementMax.copy(this.boundingBox.max);
    this.elementMin.copy(this.boundingBox.min);
  }
}