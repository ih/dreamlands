AFRAME.registerComponent('binary-operator', {
  init: function () {
    this.el.setAttribute('geometry', {
      primitive: 'box',
      depth: .1,
      height: .1,
      width: .1
    });
    this.el.setAttribute('grabbable', true);
    this.el.setAttribute('stretchable', true);
    this.el.setAttribute('class', 'collidable syntax');
    this.el.innerHTML = `<a-sphere snap-site="controller:#right-hand" radius=".1" color="yellow" material="transparent:true; opacity:.5;" position=".22 0 0"></a-sphere>
          <a-sphere snap-site="controller:#right-hand" radius=".1" color="yellow" material="transparent:true; opacity:.5;" position="-.22 0 0"></a-sphere>`;
    this.el.setAttribute('output', {
      position: '0 .15 0',
      size: .03
    });
    this.value = '+';
    this.el.evaluate = this.evaluate.bind(this);
  },

  evaluate: function () {
    let code = this.getString();
    let output = eval(code);
    let type = '';
    let textOutput = `${code} => ${output}`
    if (typeof output === 'string') {
      type = 'error';
      textOutput = output;
    }
    this.el.setAttribute('output', {
      output: textOutput,
      type: type
    })
    return output;
  },

  getString: function () {
    let operand0 = this.getOperand(0);
    let operand1 = this.getOperand(1);
    if (operand0 !== undefined && operand1 !== undefined) {
      return `${operand0.evaluate()} ${this.value} ${operand1.evaluate()}`;
    } else {
      return '"undefined operand"';
    }
  },

  // return what was snapped into the operand component
  getOperand: function (index) {
    return this.el.children[index].children[0];
  }
});
