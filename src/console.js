'use strict';

export default {
  ...console,
  log: (() => {
    if(process.env.NODE_ENV !== 'production')
      return console.log;
    return () => {};
  })()
};
