'use strict';

import {native as pg} from 'pg';

import db from 'utils/db';

export default class database extends db {
  constructor(config) {
    super();
    this.config = Object.assign({
      host: 'localhost',
      port: 5432,
      max: 10,
      idleTimeoutMillis: 30000
    }, config);
    this.db = new pg.Pool(this.config);
    this.funcName = 'query';
  }

  get pool() {
    return this.db;
  }

  get(query, callback) {
    return this._get(
      query,
      callback || ((resolve, reject) => (err, data) => {
        if(err)
          reject(err);
        else
          resolve(
            JSON.parse(
              JSON.stringify(data.rows)
            )[0] || {}
          );
      })
    );
  }

  all(query, callback) {
    return this._all(
      query,
      callback || ((resolve, reject) => (err, data) => {
        if(err)
          reject(err);
        else
          resolve(
            JSON.parse(
              JSON.stringify(data.rows)
            )
          );
      })
    );
  }
}
