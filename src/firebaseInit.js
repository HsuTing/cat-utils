'use strict';

import process from 'process'
import * as firebase from 'firebase';

import checkEnv from './checkEnv';

checkEnv([
  'FIREBASE_APIKEY',
  'FIREBASE_AUTHDOMAIN',
  'FIREBASE_DATABASEURL',
  'FIREBASE_STORAGEBUCKET'
]);

firebase.initializeApp({
  apiKey: process.env.FIREBASE_APIKEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  storageBucket: process.env.FIREBASE_STORAGEBUCKET
});

export default firebase;
