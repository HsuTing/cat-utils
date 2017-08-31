'use strict';

import fs from 'fs';
import path from 'path';

import sqlite from './../sqlite';
import postgresql from './../postgresql';
import config from './utils/docker-config';

const test_callback = (resolve, reject) => (err, data) => {
  if(err)
    return reject(false);
  resolve(true);
};

const successFunc = (name, func) => (
  name === 'sqlite' ?
    expect(func).resolves.toBe(true) :
    expect(func).resolves.toBeDefined()
);

const failObj = name => (
  name === 'sqlite' ?
    {errno: 1, code: 'SQLITE_ERROR'} :
    {}
);

[{
  name: 'sqlite',
  db: new sqlite()
}, {
  name: 'postgresql',
  db: new postgresql(config)
}].forEach(({name, db}, index) => {
  describe(name, () => {
    const func = name === 'sqlite' ? 'sqlite' : 'pool';
    it(`# get ${func}`, () => {
      expect(db[func]).toBeDefined();
    });

    describe('# create table', () => {
      const query = {
        col: name === 'sqlite' ? 'TEXT' : 'varchar(40)'
      };

      it('## success', () => successFunc(name, db.create('test', query)));

      it('## fail', () => expect(db.create('test', query))
        .rejects.toMatchObject(failObj(name)));

      it('## custom callback', () => expect(db.create('test', query, test_callback))
        .rejects.toBe(false));
    });

    describe('# insert data', () => {
      it('## success', () => successFunc(name, db.insert('test', {col: '\'test\''})));

      it('## fail', () => expect(db.insert('test', {test: '\'test\''}))
        .rejects.toMatchObject(failObj(name)));

      it('## custom callback', () => expect(db.insert('test', {test: 'TEXT'}, test_callback))
        .rejects.toBe(false));
    });

    describe('# get', () => {
      beforeAll(() => db.insert('test', {col: '\'testt\''}));

      describe('## all data', () => {
        it('### success', () => expect(db.all('SELECT * FROM test'))
          .resolves.toMatchObject([{col: 'test'}, {col: 'testt'}]));

        it('### fail', () => expect(db.all('SELECT * FROM testt'))
          .rejects.toMatchObject(failObj(name)));

        it('### custom callback', () => expect(db.all('SELECT * FROM testt', test_callback))
          .rejects.toBe(false));
      });

      describe('## first data', () => {
        it('### success', () => expect(db.get('SELECT * FROM test'))
          .resolves.toMatchObject({col: 'test'}));

        it('### fail', () => expect(db.get('SELECT * FROM testt'))
          .rejects.toMatchObject(failObj(name)));

        it('### custom callback', () => expect(db.get('SELECT * FROM testt', test_callback))
          .rejects.toBe(false));
      });
    });

    describe('# update data', () => {
      describe('## with using where', () => {
        beforeAll(() => db.update('test', {col: '\'try\''}, 'col = \'test\''));

        it('### success', () => expect(db.all('SELECT * FROM test ORDER BY col ASC'))
          .resolves.toMatchObject([{col: 'testt'}, {col: 'try'}]));

        it('### fail', () => expect(db.update('testt', {col: 'try'}, 'col = \'test\''))
          .rejects.toMatchObject(failObj(name)));

        it('### custom callback', () => expect(db.update('testt', {col: 'try'}, 'col = \'test\'', test_callback))
          .rejects.toBe(false));
      });

      describe('## without using where', () => {
        beforeAll(() => db.update('test', {col: '\'try\''}));

        it('### success', () => expect(db.all('SELECT * FROM test'))
          .resolves.toMatchObject([{col: 'try'}, {col: 'try'}]));

        it('### fail', () => expect(db.update('testt', {col: 'try'}))
          .rejects.toMatchObject(failObj(name)));
      });
    });

    describe('# empty data', () => {
      beforeAll(() => {
        if(name === 'sqlite')
          return db.sqlite.run('DELETE FROM test');
        else
          return db.pool.query('DELETE FROM test');
      });

      it('## get', () => expect(db.get('SELECT * FROM test'))
        .resolves.toMatchObject({}));
    });

    describe('# drop table', () => {
      it('## success', () => successFunc(name, db.drop('test')));

      it('## fail', () => expect(db.drop('test'))
        .rejects.toMatchObject(failObj(name)));

      it('## custom callback', () => expect(db.drop('testt', test_callback))
        .rejects.toBe(false));
    });
  });

  afterAll(() => {
    fs.unlinkSync(path.resolve(__dirname, './../../db.sqlite3'));
  });
});
