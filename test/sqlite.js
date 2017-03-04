'use strict';

const should = require('should');
const process = require('process');

const sqlite = require('./../lib/sqlite').default;
const db = new sqlite();

describe('sqlite', () => {
  it('get sqlite', () => {
    should.exist(db.sqlite);
  });

  it('can not call as function', () => {
    (() => {
      sqlite();
    }).should.be.throw('Cannot call a class as a function');
  });

  describe('build datebase', () => {
    it('default path', () => {
      new sqlite();
    });

    it('custom path', () => {
      new sqlite('./test/db.sqlite3');
    });
  });

  describe('create table', () => {
    it('success', () => {
      return db.create('test', {
        col: 'TEXT'
      }).should.be.finally.true();
    });

    it('fail', () => {
      return db.create('test', {
        col: 'TEXT'
      }).should.be.rejected();
    });
  });

  describe('insert data', () => {
    it('success', () => {
      return db.insert('test', {
        col: '\'test\''
      }).should.be.finally.true();
    });

    it('fail', () => {
      return db.insert('test', {
        test: '\'test\''
      }).should.be.rejected();
    });
  });

  describe('get', () => {
    before(() => {
      return db.insert('test', {
        col: '\'testt\''
      });
    });

    describe('all data', () => {
      it('success', () => {
        return db.all('SELECT * FROM test')
          .should.be.finally.eql([{col: 'test'}, {col: 'testt'}]);
      });

      it('fail', () => {
        return db.all('SELECT * FROM testt')
          .should.be.rejected();
      });
    });

    describe('first data', () => {
      it('success', () => {
        return db.get('SELECT * FROM test')
          .should.be.finally.eql({col: 'test'});
      });

      it('fail', () => {
        return db.get('SELECT * FROM testt')
          .should.be.rejected();
      });
    });
  });

  describe('update data', () => {
    describe('with using where', () => {
      before(() => {
        return db.update('test', {col: '\'try\''}, 'col = \'test\'');
      });

      it('success', () => {
        return db.all('SELECT * FROM test')
          .should.be.finally.eql([{col: 'try'}, {col: 'testt'}]);
      });

      it('fail', () => {
        return db.update('testt', {col: 'try'}, 'col = \'test\'')
          .should.be.rejected();
      });
    });

    describe('without using where', () => {
      before(() => {
        return db.update('test', {col: '\'try\''});
      });

      it('success', () => {
        return db.all('SELECT * FROM test')
          .should.be.finally.eql([{col: 'try'}, {col: 'try'}]);
      });

      it('fail', () => {
        return db.update('testt', {col: 'try'})
          .should.be.rejected();
      });
    });
  });

  describe('empty data', () => {
    before(() => {
      db.sqlite.run('DELETE FROM test WHERE col = \'try\'');
    });

    it('get', () => {
      return db.get('SELECT * FROM test')
        .should.be.finally.eql({});
    });
  });

  describe('drop table', () => {
    it('success', () => {
      return db.drop('test').should.be.finally.true();
    });

    it('fail', () => {
      return db.drop('test').should.be.rejected();
    });
  });
});
