require('dotenv').config();
const admin = require('firebase-admin');

const firebaseConfig = {
  apiKey: 'API_KEY',
  authDomain: 'PROJECT_ID.firebaseapp.com',
  databaseURL: 'https://PROJECT_ID.firebaseio.com',
  projectId: 'PROJECT_ID',
  storageBucket: 'PROJECT_ID.appspot.com',
  messagingSenderId: 'SENDER_ID',
  appId: 'APP_ID',
  measurementId: 'G-MEASUREMENT_ID',
};

admin.initializeApp({
  credential: applicationDefault(),
});

const db = admin.getFirestore(); //?

export default db;
