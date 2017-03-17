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
  }
});
