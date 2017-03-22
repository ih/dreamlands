AFRAME.registerComponent('variable-assignment', {
  init: function () {
      this.label = 'x';
      this.el.setAttribute('geometry', {
        primitive: 'octahedron',
        radius: .1,
        color: 'blue'
      });
      this.el.setAttribute('grabbable', true);
      this.el.setAttribute('class', 'collidable syntax');
      this.el.setAttribute('output', {
        position: '0 .15 0',
        size: .03
      });
      this.el.setAttribute('text', {
        align: 'center',
        zOffset: .1,
        value: `let ${this.label} =`
      });
      this.el.innerHTML = `
        <a-sphere
          snap-site="controller:#right-hand"
          radius=".1"
          color="yellow"
          material="transparent:true; opacity:.5;"
          position=".22 0 0">
        </a-sphere>
      `;
      this.el.evaluate = this.evaluate.bind(this);
  },

  evaluate: function () {
    let variableValueEntity = this.getValueEntity();
    if (variableValueEntity === undefined) {
       this.el.setAttribute('output', {
         output: `undefined value`,
         type: 'error'
       });
       return null;
    }
    let variableValue = variableValueEntity.evaluate();
    this.el.setAttribute('output', {
      output: `${this.label} = ${variableValue}`,
      type: ''
    });
    // TODO change so environment context/scope is either directly manipulated
    // or signal is sent to manipulate it, since this expression may be nested
    // in other expressions whose evaluation does not necessarily return a context
    // update
    return {
      variable: this.label,
      value: variableValue
    };
  },

  getValueEntity: function () {
    return this.el.children[0].children[0];
  }
});
