'use strict';

import 'babel-polyfill';

import postgresql from './../postgresql';

export default async (
  db_config,
  new_db_config
) => {
  const db = new postgresql(db_config);
  const new_db = new postgresql(new_db_config);

  [db, new_db].forEach(database => {
    database.pool.on('error', (err, client) => {
      console.error('idle client error', err.message, err.stack)
    });
  });

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
  } catch(e) {
    console.log(e);
    return false;
  }

  return true;
};
