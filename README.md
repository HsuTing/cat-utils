# Cat-utils [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
Utils for cat.

## Utils
You can see all detail in [code](./src). Use most of them like `import [util name] from 'cat-utils/lib/[util name]'`.

#### console
- Not show message when `process.env.NODE_ENV === 'production'`.

#### check
- Use to check some value.
- You can see [here](./test/check.js) to learn how to use.

#### allpay
- Install: `uuid`, `node-fetch`, `moment`
- Use to get `CheckMacValue`.

#### firebase-utils
- Install: `firebase`
- Init, Auth of `firebase`.

#### google-drive
- Install: `readline`, `google-auth-library`
- Use `google drive api`.
- You need to add `google_drive_secret.json` in `.ignore`.

#### mail
- Install: `nodemailer`
- Send email with `smtp` server.

#### paypal
- Install: `paypal-rest-sdk`
- Configure of `paypal`.

#### db
- If you need to change database, you just need to import from other `db name`.
- You can see [here](./test/db.js) to learn how to use.
- List
  - Import module like `import [db name] from 'cat-utils/lib/[db name]'`.
  - sqlite
    - Install: `sqlite3`
  - postgresql
    - You can see `pg` to now how to set config.
    - Install: `pg` and `pg-natvie`

## bin
#### db-shell
- Install: `babel-polyfill` and the other database you use.
- Use to modify database in command line.
- Example

  ```js
  db-shell [db name] [config]
  ```

- `config`: Use it when you need. If you need to use object like `postgresql`, you can use like `'{"port": 8000}'`.
- You can input `\q` and `.exit` to quit `db-shell`.

#### postgresql-copy
- Install: `babel-polyfill`, `pg` and `pg-natvie`
- Copy the postgresql server to the new postgresql server.
- Example

  ```js
  postgresql-copy
  ```

- Set postgresql server with `process.env`.
  - PGUSER
  - PGDATABASE
  - PGPASSWORD
  - PGHOST
  - PGPORT
  - NEWPGHOST

## License
MIT © [hsuting](http://hsuting.com)

[npm-image]: https://badge.fury.io/js/cat-utils.svg
[npm-url]: https://www.npmjs.com/package/cat-utils
[travis-image]: https://travis-ci.org/HsuTing/cat-utils.svg?branch=master
[travis-url]: https://travis-ci.org/HsuTing/cat-utils
