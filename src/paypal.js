'use strict';

import process from 'process';
import paypal from 'paypal-rest-sdk';

const ENV = process.env.NODE_ENV === 'production';

paypal.configure({
  mode: ENV ? 'live' : 'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET
});

export default paypal;
