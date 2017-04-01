'use strict';

import process from 'process';

export default names => {
  if(names instanceof Array) {
    names.forEach(name => {
      if(!process.env[name])
        throw new Error(`process.env.${name} is undefined.\n${JSON.stringify(names)}`);
    });
  } else {
    if(!process.env[names])
      throw new Error(`process.env.${names} is undefined.`);
  }

  return true;
};
