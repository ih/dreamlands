export function stringToDomElement(domString) {
  let div = document.createElement('div');
  div.innerHTML = domString.trim();
  return div.firstChild;
}

export function positionStringToObject(positionString) {
  let coordinates = positionString.split(' ');
  return {
    x: Number(coordinates[0]),
    y: Number(coordinates[1]),
    z: Number(coordinates[2])
  };
}

export function positionObjectToString(positionObject) {
  return `${positionObject.x} ${positionObject.y} ${positionObject.z}`;
}

// update currentDomElement so its attributes match targetDomElement
// look into virtual dom/dom diffing libraries to do this instead
export function matchAttributes(currentDomElement, targetDomElement) {
  let targetAttributes = targetDomElement.attributes;
  // used for removal of attributes at the end
  let targetAttributeNames = new Set([]);
  // add new attributes or update existing ones
  for (let i = 0; i < targetAttributes.length; i++) {
    let targetAttribute = targetAttributes[i];
    let currentAttributeValue = currentDomElement.getAttribute(targetAttribute.name);
    if (currentAttributeValue != targetAttribute.value) {
      currentDomElement.setAttribute(targetAttribute.name, targetAttribute.value);
    }
    targetAttributeNames.add(targetAttribute.name);
  }

  // remove attributes from current that are not on target
  let currentAttributes = currentDomElement.attributes;
  for (let i = 0; i < currentAttributes.length; i ++) {
    let currentAttribute = currentAttributes[i];
    if (!targetAttributeNames.has(currentAttribute.name)) {
      currentDomElement.removeAttribute(currentAttribute.name);
    }
  }
  return currentDomElement;
}
