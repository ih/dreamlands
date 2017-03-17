// from https://raw.githubusercontent.com/aframevr/aframe/master/examples/showcase/tracked-controls/components/aabb-collider.js
// similar but has events for when an entity first collides and when it stops colliding
AFRAME.registerComponent('aabb-collider-collection', {
  schema: {
    objects: {default: ''},
    state: {default: 'collided'},
    interval: {type: 'number', default: 100}
  },

  init: function () {
    this.els = [];
    this.collisions = new Set();
    this.elMax = new THREE.Vector3();
    this.elMin = new THREE.Vector3();
  },

  /**
   * Update list of entities to test for collision.
   */
  update: function () {

  },

  tick: (function () {
    var boundingBox = new THREE.Box3();
    return function (time) {
      if ((time - this.lastTime > this.data.interval) || !this.lastTime) {
        var data = this.data;
        var objectEls;

        // Push entities into list of els to intersect.
        if (data.objects) {
          objectEls = this.el.sceneEl.querySelectorAll(data.objects);
        } else {
          // If objects not defined, intersect with everything.
          objectEls = this.el.sceneEl.children;
        }
        // Convert from NodeList to Array
        this.els = Array.prototype.slice.call(objectEls);
        this.lastTime = time;
      }

      var el = this.el;
      var mesh = el.getObject3D('mesh');
      var self = this;
      // No mesh, no collisions
      if (!mesh) { return; }
      // Update the bounding box to account for rotations and
      // position changes.
      updateBoundingBox();
      // Update collisions.
      this.els.forEach(intersect);

      // AABB collision detection
      function intersect (el) {
        var intersected;
        var mesh = el.getObject3D('mesh');
        var elMin;
        var elMax;
        if (!mesh) { return; }
        boundingBox.setFromObject(mesh);
        elMin = boundingBox.min;
        elMax = boundingBox.max;
        // Bounding boxes are always aligned with the world coordinate system.
        // The collision test checks for the conditions where cubes intersect.
        // It's an extension to 3 dimensions of this approach (with the condition negated)
        // https://www.youtube.com/watch?v=ghqD3e37R7E
        intersected = (self.elMin.x <= elMax.x && self.elMax.x >= elMin.x) &&
                      (self.elMin.y <= elMax.y && self.elMax.y >= elMin.y) &&
                      (self.elMin.z <= elMax.z && self.elMax.z >= elMin.z);
        if (!intersected) {
          if (self.collisions.has(el)) {
            self.collisions.delete(el);
            el.removeState(self.data.state);
            self.el.emit('removed', {el: el, collection: self.collisions});
          }
          return;
        }
        if (!self.collisions.has(el)) {
            self.collisions.add(el);
            el.addState(self.data.state);
            self.el.emit('added', {el: el, collection: self.collisions});
        }
      }

      function updateBoundingBox () {
        boundingBox.setFromObject(mesh);
        self.elMin.copy(boundingBox.min);
        self.elMax.copy(boundingBox.max);
      }
    };
  })()
});
