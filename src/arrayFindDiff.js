// @flow
'use strict';

export default <T>(
  arrayOne: Array<T>,
  arrayTwo: Array<T>
): Array<T> => arrayOne.reduce((
  result: Array<T>,
  element: T
): Array<T> => {
  if(!arrayTwo.includes(element))
    result.push(element);

  return result;
}, []);
