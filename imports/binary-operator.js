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
    this.el.evaluate = this.evaluate.bind(this);
    this.value = '+';
  },

  evaluate: function () {
    return eval(this.getString());
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
