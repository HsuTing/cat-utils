# Cat-utils [![NPM version][npm-image]][npm-url]
Utils for cat.

## Utils
You can see all detail in [code](./src).
- check
  - Use to check some value.
  - You can see [here](./test/check.js).
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
- db
  - sqlite3
    - Install: `sqlite3`
    - `Promise` for `sqlite3`.
  - postgresql
    - Install: `pg`
    - `Promise` for `postgresql`.
  - If you need to change database, you just need to import from other module.
  - You can see [here](./test/db.js).
- graphql-utils
  - Install: `graphql`
  - Get fields of `GraphQLObjectType`.
- event-controller
  - Control events of window.

## License
MIT © [hsuting](http://hsuting.com)

[npm-image]: https://badge.fury.io/js/cat-utils.svg
[npm-url]: https://npmjs.org/package/cat-utils
