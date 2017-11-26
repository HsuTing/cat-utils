'use strict';

import arrayFindDiff from './../arrayFindDiff';

it('arrayFindDiff', () => {
  expect(arrayFindDiff([1, 2], [1])).toMatchObject([2]);
});
