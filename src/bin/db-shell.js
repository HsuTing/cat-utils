#!/usr/bin/env node
'use strict';

import 'babel-polyfill';
import process from 'process';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const name = process.argv[2];

let db = null;
try {
  const db_class = require(`./../${name}`).default;
  const config = process.argv[3];

  if(config)
    db = new db_class(config[0] === '{' ? JSON.parse(config) : config);
  else
    db = new db_class();
}
catch(e) {
  console.log(e);
  throw new Error(`Does not have this DB: ${name}`);
}

const getQuery = preQuery => rl.question(
  `${preQuery === '' ? name : name.replace(/./g, '.')}> `,
  query => {
    // command for exit
    const nowQuery = preQuery + query;

    if(nowQuery[0] === '.')
      switch(nowQuery) {
        case '.exit':
        case '\\q':
          rl.close();
          return process.exit();
      }

    // check end of query;
    if(nowQuery.slice(-1) !== ';')
      return getQuery(nowQuery + ' ');

    return (async () => {
      try {
        const results = await db.all(nowQuery);
        const fields = results.length === 0 ? [] : Object.keys(results[0]);

        if(fields.length !== 0) {
          const outputFields = `| ${fields.join(' | ')} |`;

          console.log(outputFields);
          console.log(outputFields.replace(/[^|]/g, '-'));
        }

        results.forEach(result => (
          console.log(`| ${fields.map(field => result[field]).join(' | ')} |`)
        ));
      } catch(e) {
        console.log(e);
      }

      getQuery('');
    })();
  }
);
getQuery('');
