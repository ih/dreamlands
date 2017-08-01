export function createSyntaxElement(type) {
  let number = document.createElement('a-entity');
  number.setAttribute(type, '');
  return number;
}