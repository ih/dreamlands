export function stringToDomElement(domString) {
  let div = document.createElement( "div" );
  div.innerHTML = domString.trim();
  return div.firstChild;
}

export function positionStringToObject(positionString) {
  let coordinates = positionString.split(' ');
  return {
    x: Number(coordinates[0]),
    y: Number(coordinates[1]),
    z: Number(coordinates[2])
  }
}
