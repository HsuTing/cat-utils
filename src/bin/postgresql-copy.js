#!/usr/bin/env node
'use strict';

require('babel-polyfill');
import process from 'process';

import postgresql from './../postgresql';

const config = {
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT
};

const db = new postgresql(config);
const new_db = new postgresql(Object.assign({}, config, {
  host: process.env.NEWPGHOST
}));

[db, new_db].forEach(database => {
  database.pool.on('error', (err, client) => {
    console.error('idle client error', err.message, err.stack)
  });
});

(async () => {
  try {
    const tables = (
      await db.all('select table_name from information_schema.tables WHERE table_schema=\'public\'')
    ).map(({table_name}) => table_name);

    await Promise.all(
      (await new_db.all('select table_name from information_schema.tables WHERE table_schema=\'public\'')
      ).map(({table_name}) => (async () => {
        if(tables.indexOf(table_name) === -1)
          return;

        await Promise.all(
          (await db.all(`SELECT * FROM ${table_name}`)
          ).map(data => (async () => {
            const output = {};

            Object.keys(data).forEach(key => {
              output[key] = typeof data[key] === 'string' ? `'${data[key]}'` : data[key]
            });
            await new_db.insert(table_name, output);
          })())
        )
      })())
    );

    console.log('done');
    process.exit();
  } catch(e) {
    console.log(e);
  }
})();
