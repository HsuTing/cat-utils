'use strict';

import path from 'path';
import process from 'process';
import sqlite3 from 'sqlite3';

const root = process.cwd();

export default class database {
  constructor(db_path){
    this.db = new sqlite3.Database(path.resolve(root, db_path || './db.sqlite3'));
  }

  get sqlite() {
    return this.db;
  }

  create(name, fields = {}) {
    const db = this.db;
    const keys = Object.keys(fields);
    const attributes = keys.map(key => {
      return `${key} ${fields[key]}`;
    }).join(',')

    return new Promise((resolve, reject) => {
      db.run(`CREATE TABLE ${name} (${attributes})`, err => {
        if(err)
          reject(err);
        else
          resolve(true);
      });
    });
  }

  drop(name) {
    const db = this.db;

    return new Promise((resolve, reject) => {
      db.run(`DROP TABLE ${name}`, err => {
        if(err)
          reject(err);
        else
          resolve(true);
      });
    });
  }

  insert(name, items = {}) {
    const db = this.db;
    const keys = Object.keys(items);
    const value = keys.map(key => {
      return items[key];
    }).join(',');

    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO ${name} (${keys.join(',')}) VALUES (${value})`, err => {
        if(err)
          reject(err);
        else
          resolve(true);
      });
    });
  }

  update(name, items = {}, condition) {
    const db = this.db;
    const keys = Object.keys(items);
    const value = keys.map(key => {
      return `${key} = ${items[key]}`;
    }).join(',');

    return new Promise((resolve, reject) => {
      db.run(`UPDATE ${name} SET ${value}${condition ? ` WHERE ${condition}` : ''}`, (err, data) => {
        if(err)
          reject(err);
        else
          resolve(true);
      });
    });
  }

  get(query) {
    const db = this.db;

    return new Promise((resolve, reject) => {
      db.get(query, (err, data) => {
        if(err)
          reject(err);
        else
          resolve(data || {});
      });
    });
  }

  all(query) {
    const db = this.db;

    return new Promise((resolve, reject) => {
      db.all(query, (err, data) => {
        if(err)
          reject(err);
        else
          resolve(data);
      });
    });
  }
}
