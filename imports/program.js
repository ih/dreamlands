AFRAME.registerComponent('program', {
  init: function () {
    this.el.innerHTML = `
      <a-entity class="body" environment position="0 -1 0">
      </a-entity>
    `;

    this.label = 'program';

    this.el.setAttribute('geometry', {
      primitive: 'torus',
      radius: .1,
      radiusTubular: .02
    });

    this.el.setAttribute('material', {
      color: 'yellow'
    });

    this.el.setAttribute('grabbable', true);
    this.el.setAttribute('class', 'program collidable');
    this.el.setAttribute('text', {
      align: 'center',
      zOffset: .1,
      value: `${this.label}`
    });
  }
});
