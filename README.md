# Cat-utils [![NPM version][npm-image]][npm-url]
Utils for cat.

## Utils
You can see all detail in [code](./src).
- checkEnv
  - Use to check `process.env`.
  - You can see [here](./test/checkEnv.js).
- allpay
  - Install: `uuid`, `node-fetch`, `moment`
  - Use to get `CheckMacValue`.
- firebase-utils
  - Install: `firebase`
  - Init, Auth of `firebase`.
- google-drive
  - Install: `readline`, `google-auth-library`
  - Use `google drive api`.
  - You need to add `google_drive_secret.json` in `.ignore`.
- imgResize
  - Use to resize img to meet size of parentNode.
- mail
  - Install: `nodemailer`
  - Send email with `smtp` server.
- paypal
  - Install: `paypal-rest-sdk`
  - Configure of `paypal`.
- sqlite
  - Install: `sqlite3`
  - `Promise` for `sqlite3`.
  - You can see [here](./test/sqlite.js).
- graphql-utils
  - Install: `graphql`
  - Get fields of `GraphQLObjectType`.

## License
MIT © [hsuting](http://hsuting.com)

[npm-image]: https://badge.fury.io/js/cat-utils.svg
[npm-url]: https://npmjs.org/package/cat-utils
