import * as DOMHelpers from '../imports/dom-helpers.js';
import { MenuItem } from '../imports/menu-item.js';
import { Number } from '../imports/number.js';

export class NumberMenuItem extends MenuItem {
  async render(parent) {
    let iconElement = DOMHelpers.stringToDomElement(`
    <a-sphere
    radius=".05"
    class="menu-icon"
    text="align:center;
    zOffset:.1;
    value:Number"
    color="red">
    </a-sphere>
    `);
    this.renderedElement = await DOMHelpers.appendChild(parent, iconElement);
    this.renderedElement.instance = this;
    return this.renderedElement;
  }

  createItem() {
    const number = new Number();
    const scene = document.querySelector('a-scene');
    number.render(scene);
  }
}