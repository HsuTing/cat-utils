'use strict';

import checkEnv from './../checkEnv';

it('checkEnv', () => {
  expect(() => {
    checkEnv([
      'test'
    ]);
  }).toThrow('test is undefined.');

  expect(checkEnv('NODE_ENV')).toBeUndefined();
});
