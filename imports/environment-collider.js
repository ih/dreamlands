// from https://raw.githubusercontent.com/aframevr/aframe/master/examples/showcase/tracked-controls/components/aabb-collider.js
// similar but has events for when an entity first collides and when it stops colliding

// we assume the environment always exists within
// some other element e.g. a 'function' or 'if' etc
// detect collisions with siblings of the environment container and any children
// of the environment, but NOT the container
// e.g. for a function we don't want to detect collisions w/ the entity that is
// the function label
AFRAME.registerComponent('environment-collider', {
  schema: {
    objects: {default: ''},
    state: {default: 'collided'},
    interval: {type: 'number', default: 100},
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

  // get siblings of the parent container
  selectPossibleElements: function () {
    let data = this.data;
    // outsideElement contains both the environment and what it's attached to
    // e.g. function component
    let outsideElement = this.el.parentNode.parentNode;
    let elements = Array.from(outsideElement.querySelectorAll(`:scope > ${data.objects}`));

    // siblings of environment are ignored here and handled in the
    elements = elements.concat(Array.from(this.el.querySelectorAll(`:scope > ${data.objects}`)));
    return elements;
  },

  tick: (function () {
    var boundingBox = new THREE.Box3();
    return function (time) {
      if ((time - this.lastTime > this.data.interval) || !this.lastTime) {
        var data = this.data;

        // Push entities into list of els to intersect.
        if (data.objects) {
          this.objectEls = this.selectPossibleElements();
        } else {
          // TODO If objects not defined, intersect with everything at children and above level.
          this.objectEls = [];
        }

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
      // Update collisions for objectEls moving in or out of the element
      this.objectEls.forEach(intersect);
      // update for elements that were colliding but are no longer in objectEls
      // e.g. if an object is deleted or moves to be a child of another
      this.collisions.forEach(remove);

      // AABB collision detection
      function intersect(el) {
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
            self.el.emit('removed', {el: el, collection: Array.from(self.collisions)});
          }
          return;
        }
        if (!self.collisions.has(el)) {
            self.collisions.add(el);
            el.addState(self.data.state);
            self.el.emit('added', {el: el, collection: Array.from(self.collisions)});
        }
      }


      function updateBoundingBox() {
        boundingBox.setFromObject(mesh);
        self.elMin.copy(boundingBox.min);
        self.elMax.copy(boundingBox.max);
      }

      function remove(el) {
        if (!self.objectEls.includes(el)) {
            self.collisions.delete(el);
            el.removeState(self.data.state);
            self.el.emit('removed', {el: el, collection: Array.from(self.collisions)});
        }
      }
    };
  })()
});
