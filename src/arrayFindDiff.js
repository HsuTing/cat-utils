'use strict';

export default (arrayOne, arrayTwo) => {
  return arrayOne.reduce((result, element) => {
    if(!arrayTwo.includes(element))
      result.push(element);

    return result;
  }, []);
};
