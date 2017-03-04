# Cat-utils [![NPM version][npm-image]][npm-url]
Utils for cat.

## Utils
You can see all detail in [code](./src).
- allpay
  - You need to install `uuid`, `node-fetch` and `moment`.
  - Use to get `CheckMacValue`.
- firebaseInit
  - You need to install `firebase`.
  - init of `firebase`.
- googleDrive
  - You need to install `readline` and `google-auth-library`.
  - Use `google drive api`.
  - You need to add `google_drive_secret.json` in `.ignore`.
- imgResize
  - Use to resize img to meet size of parentNode.
- mail
  - You need to install `nodemailer`.
  - Send email with `smtp` server.
- paypal
  - You need to install `paypal-rest-sdk`.
  - Configure of `paypal`.
- sqlite
  - You need to install `sqlite3`.
  - `Promise` for `sqlite3`.
  - You can see [here](./test/sqlite)

## License
MIT © [hsuting](http://hsuting.com)

[npm-image]: https://badge.fury.io/js/cat-utils.svg
[npm-url]: https://npmjs.org/package/cat-utils
