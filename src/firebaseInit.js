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

export const auth = callback => {
  checkEnv([
    'FIREBASE_EMAIL',
    'FIREBASE_PASSWORD'
  ]);

  if(callback)
    firebase.auth()
      .signInWithEmailAndPassword(process.env.FIREBASE_EMAIL, process.env.FIREBASE_PASSWORD)
      .catch(callback);
  else
    firebase.auth()
      .signInWithEmailAndPassword(process.env.FIREBASE_EMAIL, process.env.FIREBASE_PASSWORD)
      .catch(err => {
        throw new Error(err);
      });
};

export default firebase;
