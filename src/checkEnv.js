'use strict';

import process from 'process';

const check = keys => keys.reduce((_, name) => {
  if(!process.env[name])
    throw new Error(`${name} is undefined.`);

  return true;
}, false);

export default keys => (
  keys instanceof Array ?
    check(keys) :
    check([keys])
);
