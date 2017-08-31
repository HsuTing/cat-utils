'use strict';

import process from 'process';

export default process.env.TEST_ENV === 'docker' ? {
  host: 'db',
  user: 'test',
  database: 'test',
  password: 'test'
} : {};
