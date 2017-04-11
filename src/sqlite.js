'use strict';

import path from 'path';
import process from 'process';
import sqlite3 from 'sqlite3';

import db from 'utils/db';

const root = process.cwd();

export default class database extends db {
  constructor(db_path) {
    super();
    this.db = new sqlite3.Database(
      path.resolve(root, db_path || './db.sqlite3')
    );
    this.funcName = 'run';
  }

  get sqlite() {
    return this.db;
  }

  get(query, callback) {
    return new Promise((resolve, reject) => {
      this.db.get(query, callback ? callback(resolve, reject) : ((err, data) => {
        if(err)
          reject(err);
        else
          resolve(data || {});
      }));
    });
  }

  all(query, callback) {
    return new Promise((resolve, reject) => {
      this.db.all(query, callback ? callback(resolve, reject) : ((err, data) => {
        if(err)
          reject(err);
        else
          resolve(data);
      }));
    });
  }
}
