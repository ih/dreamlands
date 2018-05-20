import * as DOMHelpers from '../imports/dom-helpers.js';
import { MenuItem } from '../imports/menu-item.js';
import { addEntityToScene } from './entities.js';

export class NumberMenuItem extends MenuItem {
  async render(parent) {
    let iconElement = DOMHelpers.stringToDomElement(`
    <a-sphere 
    radius=".1" 
    class="menu-icon" 
    text="align:center; 
    zOffset:.1; 
    value:Number" 
    color="red">
    </a-sphere>
    `);
    this.renderedElement = await DOMHelpers.appendChild(parent, iconElement);
    return this.renderedElement;
  }
}