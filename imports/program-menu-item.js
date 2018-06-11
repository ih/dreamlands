import * as DOMHelpers from '../imports/dom-helpers.js';
import { MenuItem } from '../imports/menu-item.js';
import { Program } from '../imports/program.js';

export class ProgramMenuItem extends MenuItem {
  async render(parent) {
    let iconElement = DOMHelpers.stringToDomElement(`
    <a-torus
    radius=".01"
    class="menu-icon"
    text="align:center;
    zOffset:.1;
    value:Program"
    color="yellow">
    </a-torus>
    `);
    this.renderedElement = await DOMHelpers.appendChild(parent, iconElement);
    this.renderedElement.instance = this;
    return this.renderedElement;
  }

  createItem() {
    const program = new Program();
    const scene = document.querySelector('a-scene');
    program.render(scene);
  }
}