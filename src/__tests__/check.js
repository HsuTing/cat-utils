'use strict';

import process from 'process';

import * as check from './../check';

process.env.test = true;
process.env.ttest = true;

describe('check', () => {
  describe('# env', () => {
    describe('## type of argument', () => {
      it('### string', () => {
        expect(check.env('test')).toBe(true);
      });

      it('### array', () => {
        expect(check.env(['test', 'ttest'])).toBe(true);
      });
    });

    it('## throw error when env does not exist', () => {
      expect(() => {
        check.env('tttest')
      }).toThrowError('process.env.tttest is undefined.');

      expect(() => {
        check.env(['test', 'tttest'])
      }).toThrowError(`process.env.tttest is undefined.\n["test","tttest"]`);
    });
  });

  describe('# password', () => {
    it('## no value', () => {
      expect(check.password()).toBe(0);
    });

    describe('## test password', () => {
      it('### strong', () => {
        expect(check.password('aA1bB2cC3dD4eE5')).toBe('strong');
      });

      it('### normal', () => {
        expect(check.password('aA1bB2cC3')).toBe('normal');
      });

      it('### weak', () => {
        expect(check.password('a')).toBe('weak');
      });
    });
  });
});
