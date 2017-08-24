#!/usr/bin/env node
'use strict';

import process from 'process';
import repl from 'repl';

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

const initializeContext = context => {
  context.db = db;
}
const r = repl.start('> ');

initializeContext(r.context);
r.on('reset', initializeContext);
