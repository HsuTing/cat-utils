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

export const create = (name, fields = [], callback = () => {}) => {
  db.run(`CREATE TABLE ${name} (${
    fields.map(field => {
      return `${field.name} ${field.attributes}`;
    }).join(',')
  })`, callback);
};

export const insert = (name, items = {}, callback = () => {}) => {
  const keys = Object.keys(items);
  const values = keys.map(key => {
    return items[key];
  }).join(',');

  db.run(`INSERT INTO TABLE ${name} (${keys.join(',')}) VALUES (${values})`, callback);
};
