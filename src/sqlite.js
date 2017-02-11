'use strict';

import path from 'path';
import process from 'process';
import sqlite3 from 'sqlite3';

const root = process.cwd();
const db = new sqlite3.Database(path.resolve(root, './db.sqlite3'));
export default db;

export const get = query => {
  return new Promise((resolve, reject) => {
    db.get(query, (err, data) => {
      if(err)
        reject(err);
      else
        resolve(data || {});
    });
  });
};

export const all = query => {
  return new Promise((resolve, reject) => {
    db.all(query, (err, data) => {
      if(err)
        reject(err);
      else
        resolve(data || []);
    });
  });
};
