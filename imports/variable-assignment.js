import * as DOMHelpers from '../imports/dom-helpers.js';

AFRAME.registerComponent('variable-assignment', {
  schema: {
    grabbable: {default: true}
  },
  init: function () {
      let valueHolder = DOMHelpers.stringToDomElement(`
        <a-sphere
          snap-site="controller:#right-hand"
          radius=".1"
          color="yellow"
          material="transparent:true; opacity:.5;"
          position=".22 0 0">
        </a-sphere>
      `);
      this.el.appendChild(valueHolder);
      this.label = 'x';
      this.el.setAttribute('geometry', {
        primitive: 'octahedron',
        radius: .1,
        color: 'blue'
      });
      if (this.data.grabbable) {
        this.el.setAttribute('grabbable', true);
      }
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

      this.el.evaluate = this.evaluate.bind(this);
  },

  evaluate: function (context) {
    let variableValueEntity = this.getValueEntity();
    if (variableValueEntity === undefined) {
       this.el.setAttribute('output', {
         output: `undefined value`,
         type: 'error'
       });
       return null;
    }
    let variableValue = variableValueEntity.evaluate();
    context[this.label] = variableValue;

    this.el.setAttribute('output', {
      output: `${this.label} = ${variableValue}`,
      type: ''
    });

    return variableValue;
  },

  getValueEntity: function () {
    return this.el.children[0].children[0];
  }
});
