AFRAME.registerComponent('variable', {
  init: function () {
    this.el.setAttribute('geometry', {
      primitive: 'octahedron',
      radius: .1,
      color: 'blue'
    });
    this.el.setAttribute('grabbable', true);
    this.el.setAttribute('class', 'collidable snappable syntax');
    this.el.setAttribute('output', {
      position: '0 .15 0',
      size: .03
    });
    this.label = 'x';
    this.el.setAttribute('text', {
      align: 'center',
      zOffset: .1,
      value: this.label
    });
    this.el.evaluate = this.evaluate.bind(this);
    this.el.getString = this.getString.bind(this);
  },

  evaluate: function (context) {
    if (this.label in context) {
      this.el.setAttribute('output', {
        output: `${context[this.label]}`,
        type: ''
      });
      return context[this.label];
    } else {
      this.el.setAttribute('output', {
        output: `Variable not defined in context`,
        type: 'error'
      });
      return undefined;
    }
  },

  getString: function () {
    return this.label;
  }
});
