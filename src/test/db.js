'use strict';

import should from 'should'; // eslint-disable-line no-unused-vars

import sqlite from './../sqlite';
import postgresql from './../postgresql';
import config from './docker-config';

const test_callback = (resolve, reject) => (err, data) => {
  reject(true);
  resolve(true);
};

[{
  name: 'sqlite',
  db: new sqlite()
}, {
  name: 'postgresql',
  db: new postgresql(config)
}].forEach(({name, db}, index) => {
  describe(name, () => {
    if(name === 'sqlite')
      it('# get sqlite', () => {
        should.exist(db.sqlite);
      });
    else
      it('# get pool', () => {
        should.exist(db.pool);
      });

    it('# can not call as function', () => {
      if(name === 'sqlite')
        (() => {
          sqlite();
        }).should.be.throw('Cannot call a class as a function');

      else
        (() => {
          postgresql();
        }).should.be.throw('Cannot call a class as a function');
    });

    describe('# build datebase', () => {
      if(name === 'sqlite') {
        it('## custom path', () => {
          new sqlite('./test/db.sqlite3');
        });
      }
      else {
        it('## custom config', () => {
          new postgresql({
            user: 'test'
          });
        });
      }
    });

    describe('# create table', () => {
      let query = {
        col: 'TEXT'
      };

      if(name === 'postgresql')
        query = {
          col: 'varchar(40)'
        }

      it('## success', () => {
        if(name === 'sqlite')
          return db.create('test', query)
            .should.be.finally.true();
        else
          return db.create('test', query)
            .should.be.finally.Object();
      });

      it('## fail', () => {
        return db.create('test', query)
          .should.be.rejected();
      });

      it('## custom callback', () => {
        return db.create('test', query, test_callback)
          .should.be.rejected();
      });
    });

    describe('# insert data', () => {
      it('## success', () => {
        if(name === 'sqlite')
          return db.insert('test', {
            col: '\'test\''
          }).should.be.finally.true();
        else
          return db.insert('test', {
            col: '\'test\''
          }).should.be.finally.Object();
      });

      it('## fail', () => {
        return db.insert('test', {
          test: '\'test\''
        }).should.be.rejected();
      });

      it('## custom callback', () => {
        return db.insert('test', {
          test: 'TEXT'
        }, test_callback).should.be.rejected();
      });
    });

    describe('# get', () => {
      before(() => {
        return db.insert('test', {
          col: '\'testt\''
        });
      });

      describe('## all data', () => {
        it('### success', () => {
          return db.all('SELECT * FROM test')
            .should.be.finally.eql([{col: 'test'}, {col: 'testt'}]);
        });

        it('### fail', () => {
          return db.all('SELECT * FROM testt')
            .should.be.rejected();
        });

        it('### custom callback', () => {
          return db.all('SELECT * FROM testt', test_callback)
            .should.be.rejected();
        });
      });

      describe('## first data', () => {
        it('### success', () => {
          return db.get('SELECT * FROM test')
            .should.be.finally.eql({col: 'test'});
        });

        it('### fail', () => {
          return db.get('SELECT * FROM testt')
            .should.be.rejected();
        });

        it('### custom callback', () => {
          return db.get('SELECT * FROM testt', test_callback)
            .should.be.rejected();
        });
      });
    });

    describe('# update data', () => {
      describe('## with using where', () => {
        before(() => {
          return db.update('test', {col: '\'try\''}, 'col = \'test\'');
        });

        it('### success', () => {
          if(name === 'sqlite')
            return db.all('SELECT * FROM test')
              .should.be.finally.eql([{col: 'try'}, {col: 'testt'}]);
          else
            return db.all('SELECT * FROM test')
              .should.be.finally.eql([{col: 'testt'}, {col: 'try'}]);
        });

        it('### fail', () => {
          return db.update('testt', {col: 'try'}, 'col = \'test\'')
            .should.be.rejected();
        });

        it('### custom callback', () => {
          return db.update('testt', {col: 'try'}, 'col = \'test\'', test_callback)
            .should.be.rejected();
        });
      });

      describe('## without using where', () => {
        before(() => {
          return db.update('test', {col: '\'try\''});
        });

        it('### success', () => {
          return db.all('SELECT * FROM test')
            .should.be.finally.eql([{col: 'try'}, {col: 'try'}]);
        });

        it('### fail', () => {
          return db.update('testt', {col: 'try'})
            .should.be.rejected();
        });
      });
    });

    describe('# empty data', () => {
      before(() => {
        if(name === 'sqlite')
          return db.sqlite.run('DELETE FROM test');
        else
          return db.pool.query('DELETE FROM test');
      });

      it('## get', () => {
        return db.get('SELECT * FROM test')
          .should.be.finally.eql({});
      });
    });

    describe('# drop table', () => {
      it('## success', () => {
        if(name === 'sqlite')
          return db.drop('test').should.be.finally.true();
        else
          return db.drop('test').should.be.finally.Object();
      });

      it('## fail', () => {
        return db.drop('test').should.be.rejected();
      });

      it('## custom callback', () => {
        return db.drop('testt', test_callback)
          .should.be.rejected();
      });
    });
  });
});
