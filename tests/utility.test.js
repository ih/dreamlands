import * as Utility from '../imports/utility.js';

test('arrayRemove removes an element from an array', () => {
  let testArray = [1, 2, 3];

  let result = Utility.arrayRemove(testArray, 2);

  expect(result).to.deep.equal([1, 3]);
});