AFRAME.registerComponent('program', {
  init: function () {
    this.interval = 1000;

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
    this.el.classList.add('collidable');
    this.el.classList.add('program');
    this.el.setAttribute('text', {
      align: 'center',
      zOffset: .1,
      value: `${this.label}`
    });

        // start execution of code in the environment
    this.evaluationId = setInterval(this.evaluate.bind(this), this.interval);
  },

  evaluate: function () {
    let body = this.el.querySelector('.body');
    body.evaluate({});
  }
});
