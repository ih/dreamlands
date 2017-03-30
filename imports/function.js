AFRAME.registerComponent('function', {
  init: function () {
    this.label = 'f';
    this.el.setAttribute('geometry', {
      primitive: 'tetrahedron',
      radius: .1,
      color: 'orange'
    });
    this.el.setAttribute('class', 'collidable syntax');
    this.el.setAttribute('output', {
      position: '0 .15 0',
      size: .03
    });

    // TODO add button for creating new arguments
    // TODO make environment follow tetrheadron as well as the outer part
    // the inner tetrahedron overlaps with the outer but only the inner is grabbable
    this.el.innerHTML =`
      <a-tetrahedron color="orange" radius=".1" grabbable ></a-tetrahedron>

      <a-entity environment scale=".2 .2 .2" position="0 -.22 0"><a-entity>
    `;

    this.el.evaluate = this.evaluate.bind(this);
  },

  evaluate: function () {
    return null;
  }
});
