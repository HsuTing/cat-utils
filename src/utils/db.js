'use strict';

const defualt_callback = (resolve, reject) => (err, data) => {
  if(err)
    reject(JSON.parse(JSON.stringify(err)));
  else
    resolve(data || true);
};

export default class db {
  create(name, fields, callback) {
    const keys = Object.keys(fields);
    const attributes = keys.map(key => {
      return `${key} ${fields[key]}`;
    }).join(',')

    return new Promise((resolve, reject) => {
      this.db[this.funcName](
        `CREATE TABLE ${name} (${attributes})`,
        callback ? callback(resolve, reject) : defualt_callback(resolve, reject)
      );
    });
  }

  drop(name, callback) {
    return new Promise((resolve, reject) => {
      this.db[this.funcName](
        `DROP TABLE ${name}`,
        callback ? callback(resolve, reject) : defualt_callback(resolve, reject)
      );
    });
  }

  insert(name, items, callback) {
    const keys = Object.keys(items);
    const value = keys.map(key => {
      return items[key];
    }).join(',');

    return new Promise((resolve, reject) => {
      this.db[this.funcName](
        `INSERT INTO ${name} (${keys.join(',')}) VALUES (${value})`,
        callback ? callback(resolve, reject) : defualt_callback(resolve, reject)
      );
    });
  }

  update(name, items, condition, callback) {
    const keys = Object.keys(items);
    const value = keys.map(key => {
      return `${key} = ${items[key]}`;
    }).join(',');

    return new Promise((resolve, reject) => {
      this.db[this.funcName](
        `UPDATE ${name} SET ${value}${condition ? ` WHERE ${condition}` : ''}`,
        callback ? callback(resolve, reject) : defualt_callback(resolve, reject)
      );
    });
  }

  _get(query, callback) {
    return new Promise((resolve, reject) => {
      this.db[this.funcName](
        query,
        callback(resolve, reject)
      );
    });
  }

  _all(query, callback) {
    return new Promise((resolve, reject) => {
      this.db[this.funcName](
        query,
        callback(resolve, reject)
      );
    });
  }
}
