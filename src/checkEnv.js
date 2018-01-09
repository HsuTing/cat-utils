// @flow
'use strict';

const check = (
  keys: Array<string>
): void => keys.forEach((
  name: string
): void => {
  if(!process.env[name])
    throw new Error(`${name} is undefined.`);
});

export default (
  keys: Array<string> | string
): void => (
  keys instanceof Array ?
    check(keys) :
    check([keys])
);
