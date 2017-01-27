import * as Entities from '../imports/entities.js';
// basically update the document for this entity every interval
// if there has been a change
AFRAME.registerComponent('meteor-persist', {
  schema: {
    interval: {type: 'number', default: 100}
  },

  init: function () {
    this.lastTextValue = this.el.outerHTML;
  },

  tick: function (time) {
    if ((time - this.lastTime > this.data.interval) || !this.lastTime) {
      let currentTextValue = this.el.outerHTML;
      if (currentTextValue !== this.lastTextValue) {
        let id = this.el.getAttribute('id');
        Entities.createOrUpdateEntity(id, {text: currentTextValue});
        this.lastTextValue = currentTextValue;
      }
      this.lastTime = time;
    }
  }
});
