import * as Utility from '../imports/utility.js';

AFRAME.registerComponent('binary-operator', {
  init: function () {
    this.value = '+';
    this.el.setAttribute('geometry', {
      primitive: 'box',
      depth: .1,
      height: .1,
      width: .1
    });
    this.el.setAttribute('material', {
      color: 'green'
    });
    this.el.setAttribute('text', {
      align: 'center',
      zOffset: .1,
      value: this.value,
      width: 1
    });
    this.el.setAttribute('grabbable', true);
    this.el.setAttribute('stretchable', true);
    this.el.classList.add('collidable');
    this.el.classList.add('syntax');
    this.el.innerHTML = `<a-sphere snap-collider="controller:#right-hand" radius=".1" color="yellow" material="transparent:true; opacity:.5;" position="-.22 0 0"></a-sphere>
          <a-sphere snap-collider="controller:#right-hand" radius=".1" color="yellow" material="transparent:true; opacity:.5;" position=".22 0 0"></a-sphere>`;
    this.el.setAttribute('output', {
      position: '0 .15 0',
      size: .03
    });

    this.el.evaluate = this.evaluate.bind(this);
    this.el.getString = this.getString.bind(this);
  },

  evaluate: function (context) {
    let operand0 = this.getOperand(0);
    let operand1 = this.getOperand(1);
    if (operand0 === undefined || operand1 === undefined) {
      this.el.setAttribute('output', {
        output: 'undefined operand',
        type: 'error'
      });
      // TODO change this to throw an exception?
      return;
    }

    let code = `${operand0.evaluate(context)} ${this.value} ${operand1.evaluate(context)}`;
    let output = Utility.evaluate(code, context);
    let textOutput = `${this.getString()} => ${output}`;

    this.el.setAttribute('output', {
      output: textOutput,
      type: ''
    });
    return output;
  },

  getString: function () {
    let operand0 = this.getOperand(0);
    let operand1 = this.getOperand(1);
    if (operand0 !== undefined && operand1 !== undefined) {
      return `${operand0.getString()} ${this.value} ${operand1.getString()}`;
    } else {
      return '"undefined operand"';
    }
  },

  // return what was snapped into the operand component
  getOperand: function (index) {
    return this.el.children[index].children[0];
  }
});
