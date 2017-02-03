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

// update originalDomElement so its attributes match targetDomElement
// look into virtual dom/dom diffing libraries to do this instead
export function matchAttributes(originalDomElement, targetDomElement) {
  let targetAttributes = targetDomElement.attributes;
  // used for removal of attributes at the end
  let targetAttributeNames = new Set([]);
  // add new attributes or update existing ones
  for (let i = 0; i < targetAttributes.length; i++) {
    let targetAttribute = targetAttributes[i];
    let originalAttributeValue = originalDomElement.getAttribute(targetAttribute.name);
    if (originalAttributeValue != targetAttribute.value) {
      originalDomElement.setAttribute(targetAttribute.name, targetAttribute.value);
    }
    targetAttributeNames.add(targetAttribute.name);
  }

  // remove attributes from original that are not on target
  let originalAttributes = originalDomElement.attributes;
  for (let i = 0; i < originalAttributes.length; i ++) {
    let originalAttribute = originalAttributes[i];
    if (!targetAttributeNames.has(originalAttribute.name)) {
      originalDomElement.removeAttribute(originalAttribute.name);
    }
  }
  return originalDomElement;
}

// update originalDomElement and all its descendants to match targetDomElement
// for now assumes only attributes may be different b/t original and target
export function matchElement(originalDomElement, targetDomElement) {
  let targetNodeQueue = [targetDomElement];
  let originalNodeQueue = [originalDomElement];
  while (targetNodeQueue.length > 0 && originalNodeQueue.length > 0) {
    let currentTargetNode = targetNodeQueue.shift();
    let currentOriginalNode = originalNodeQueue.shift();
    if (currentTargetNode.tagName !== currentOriginalNode.tagName) {
      return false;
    }
    matchAttributes(currentOriginalNode, currentTargetNode);
    let originalChildren = currentOriginalNode.children;
    let targetChildren = currentTargetNode.children;
    if (originalChildren.length != targetChildren.length) {
      return false;
    }
    for (let i = 0; i < targetChildren.length; i++) {
      targetNodeQueue.push(targetChildren[i]);
      originalNodeQueue.push(originalChildren[i]);
    }
  }
  return true;
}
