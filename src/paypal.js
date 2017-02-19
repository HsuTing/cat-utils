'use strict';

import process from 'process';
import paypal from 'paypal-rest-sdk';

import checkEnv from './checkEnv';

checkEnv([
  'PAYPAL_CLIENT_ID',
  'PAYPAL_CLIENT_SECRET'
]);

const ENV = process.env.NODE_ENV === 'production';

paypal.configure({
  mode: ENV ? 'live' : 'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

export default paypal;
