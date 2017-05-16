import * as Utility from '../imports/utility.js';

AFRAME.registerComponent('function', {
  init: function () {
    // TODO add button for creating new arguments
    // TODO make environment follow tetrheadron as well as the outer part
    // the inner tetrahedron overlaps with the outer but only the inner is grabbable
    this.el.innerHTML =`
      <a-entity class="parameter" variable-assignment="grabbable: false;" scale=".1 .1 .1" position=".3 0 0">
      </a-entity>
      <a-entity class="body" environment="height:.15; width:.15; depth:.15" scale=".2 .2 .2" position="0 -.22 0">
      </a-entity>
    `;

    this.label = 'f';
    this.el.setAttribute('geometry', {
      primitive: 'tetrahedron',
      radius: .1
    });
    this.el.setAttribute('material', {
      color: 'orange'
    });
    this.el.setAttribute('grabbable', true);
    this.el.setAttribute('class', 'function collidable syntax');
    this.el.setAttribute('text', {
      align: 'center',
      zOffset: .1,
      value: `${this.label}`
    });
    this.el.setAttribute('output', {
      position: '0 .15 0',
      size: .03
    });

    //       <a-tetrahedron class="collidable syntax" color="orange" radius=".1" grabbable ></a-tetrahedron>
    this.el.evaluate = this.evaluate.bind(this);
  },

  evaluate: function (context) {
    let localContext = Utility.copyContext(context);
    let parameters = this.el.querySelectorAll(':scope > .parameter');
    parameters.forEach((assignment) => {
      assignment.evaluate(context);
    });
    let body = this.el.querySelector('.body');
    let value = body.evaluate(localContext);
    this.el.setAttribute('output', {
      output: value
    });
    return value;
  }
});
