'use strict';

const should = require('should');
const process = require('process');

const checkEnv = require('./../lib/checkEnv').default;

process.env.test = true;
process.env.ttest = true;

describe('checkEnv', () => {
  describe('type of argument', () => {
    it('string', () => {
      checkEnv('test').should.be.true();
    });

    it('array', () => {
      checkEnv(['test', 'ttest']).should.be.true();
    });
  });

  it('should throw error when env does not exist', () => {
    (() => {
      checkEnv('tttest')
    }).should.be.throw('process.env.tttest is undefined.');

    (() => {
      checkEnv(['test', 'tttest'])
    }).should.be.throw('process.env.tttest is undefined.');
  });
});
