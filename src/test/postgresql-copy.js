'use strict';

import should from 'should'; // eslint-disable-line no-unused-vars

import postgresql from './../postgresql';
import postgresqlCopy from './../utils/postgresql-copy';
import config from './docker-config';

const db = new postgresql({
  ...config,
  database: 'test_2'
});

describe('postgresql copy', () => {
  before(() => db.insert('test_2', {
    col: `'test'`
  }));

  it('# copy', () => postgresqlCopy({
    ...config,
    database: 'test_2'
  }, {
    ...config,
    database: 'test_3'
  }).should.be.finally.true());
});
