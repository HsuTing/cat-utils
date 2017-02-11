# Cat-utils [![NPM version][npm-image]][npm-url]
Utils for cat.

## Utils
You can all detail in [code](./src).
- allpay
  - getPaymentInfo: use to get `CheckMacValue`.
  - You need to install `uuid`, `node-fetch` and `moment`.
- firebaseInit
  - init of `firebase`.
  - You need to install `firebase`.
- googleDrive
  - Use `google drive api`.
  - You need to install `readline` and `google-auth-library`.
  - You need to add `google_drive_secret.json` in `.ignore`.
- imgResize
  - Use to resize img to meet size of parentNode.
- mail
  - Send email with `smtp` server.
  - You need to install `nodemailer`.
- paypal
  - Configure of `paypal`.
  - You need to install `paypal-rest-sdk`.
- sqlite
  - `Promise` for `sqlite3`.
  - You need to install `sqlite3`.

## License
MIT © [hsuting](http://hsuting.com)

[npm-image]: https://badge.fury.io/js/cat-utils.svg
[npm-url]: https://npmjs.org/package/cat-utils
