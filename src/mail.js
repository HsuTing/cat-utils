'use strict';

import nodemailer from 'nodemailer';
import {renderToStaticMarkup} from 'react-dom/server';

import check from './check';

check.env([
  'MAIL_EMAIL',
  'MAIL_PASSWORD'
]);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_EMAIL,
    pass: process.env.MAIL_PASSWORD
  }
});

export default options => new Promise((resolve, reject) => {
  transporter.sendMail(Object.assign({
    from: `<${process.env.MAIL_EMAIL}>`,
    to: options.recipient,
    subject: options.subject,
    html: renderToStaticMarkup(
      options.content
    )
  }, options), (error, info) => {
    if(error)
      return reject(error);

    resolve(info);
  });
});
