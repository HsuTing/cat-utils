'use strict';

import process from 'process';
import should from 'should'; // eslint-disable-line no-unused-vars

import * as check from './../check';

process.env.test = true;
process.env.ttest = true;

describe('check', () => {
  describe('env', () => {
    describe('type of argument', () => {
      it('string', () => {
        check.env('test').should.be.true();
      });

      it('array', () => {
        check.env(['test', 'ttest']).should.be.true();
      });
    });

    it('should throw error when env does not exist', () => {
      (() => {
        check.env('tttest')
      }).should.be.throw('process.env.tttest is undefined.');

      (() => {
        check.env(['test', 'tttest'])
      }).should.be.throw(`process.env.tttest is undefined.\n["test","tttest"]`);
    });
  });

  describe('password', () => {
    it('no value', () => {
      check.password().should.be.eql(0);
    });

    describe('test password', () => {
      it('strong', () => {
        check.password('aA1bB2cC3dD4eE5').should.be.eql('strong');
      });

      it('normal', () => {
        check.password('aA1bB2cC3').should.be.eql('normal');
      });

      it('weak', () => {
        check.password('a').should.be.eql('weak');
      });
    });
  });
});
