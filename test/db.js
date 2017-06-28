'use strict';

const should = require('should');
const process = require('process');

const sqlite = require('./../lib/sqlite').default;
const postgresql = require('./../lib/postgresql').default;
const db = new sqlite();

const test_callback = (resolve, reject) => (err, data) => {
  reject(true);
  resolve(true);
};

(
  process.env.local ? [new sqlite()] : []
).concat([
  new postgresql(),
]).forEach((db, index) => {
  describe('sqlite', () => {
    if(index === 0)
      it('get sqlite', () => {
        should.exist(db.sqlite);
      });
    if(index === 1)
      it('get pool', () => {
        should.exist(db.pool);
      });

    it('can not call as function', () => {
      if(index === 0)
        (() => {
          sqlite();
        }).should.be.throw('Cannot call a class as a function');

      if(index === 1)
        (() => {
          postgresql();
        }).should.be.throw('Cannot call a class as a function');
    });

    describe('build datebase', () => {
      if(index === 0) {
        it('default path', () => {
          new sqlite();
        });

        it('custom path', () => {
          new sqlite('./test/db.sqlite3');
        });
      }

      if(index === 1) {
        it('default config', () => {
          new postgresql();
        });

        it('custom config', () => {
          new postgresql({
            user: 'hsuting'
          });
        });
      }
    });

    describe('create table', () => {
      let query = {
        col: 'TEXT'
      };

      if(index === 1)
        query = {
          col: 'varchar(40)'
        }

      it('success', () => {
        if(index === 0)
          return db.create('test', query)
            .should.be.finally.true();

        if(index === 1)
          return db.create('test', query)
            .should.be.finally.Object();
      });

      it('fail', () => {
        return db.create('test', query)
          .should.be.rejected();
      });

      it('custom callback', () => {
        return db.create('test', query, test_callback)
          .should.be.rejected();
      });
    });

    describe('insert data', () => {
      it('success', () => {
        if(index === 0)
          return db.insert('test', {
            col: '\'test\''
          }).should.be.finally.true();

        if(index === 1)
          return db.insert('test', {
            col: '\'test\''
          }).should.be.finally.Object();
      });

      it('fail', () => {
        return db.insert('test', {
          test: '\'test\''
        }).should.be.rejected();
      });

      it('custom callback', () => {
        return db.insert('test', {
          test: 'TEXT'
        }, test_callback).should.be.rejected();
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

        it('custom callback', () => {
          return db.all('SELECT * FROM testt', test_callback)
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

        it('custom callback', () => {
          return db.get('SELECT * FROM testt', test_callback)
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
          if(index === 0)
            return db.all('SELECT * FROM test')
              .should.be.finally.eql([{col: 'try'}, {col: 'testt'}]);

          if(index === 1)
            return db.all('SELECT * FROM test')
              .should.be.finally.eql([{col: 'testt'}, {col: 'try'}]);
        });

        it('fail', () => {
          return db.update('testt', {col: 'try'}, 'col = \'test\'')
            .should.be.rejected();
        });

        it('custom callback', () => {
          return db.update('testt', {col: 'try'}, 'col = \'test\'', test_callback)
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
        if(index === 0)
          return db.sqlite.run('DELETE FROM test');

        if(index === 1)
          return db.pool.query('DELETE FROM test');
      });

      it('get', () => {
        return db.get('SELECT * FROM test')
          .should.be.finally.eql({});
      });
    });

    describe('drop table', () => {
      it('success', () => {
        if(index === 0)
          return db.drop('test').should.be.finally.true();

        if(index === 1)
          return db.drop('test').should.be.finally.Object();
      });

      it('fail', () => {
        return db.drop('test').should.be.rejected();
      });

      it('custom callback', () => {
        return db.drop('testt', test_callback)
          .should.be.rejected();
      });
    });
  });
});
