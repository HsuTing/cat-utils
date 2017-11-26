'use strict';

import process from 'process';

export default keys => keys.forEach(name => {
  if(!process.env[name])
    throw new Error(`${name} is undefined.`);
});
