require('dotenv').config();
const admin = require('firebase-admin');

admin.initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID,
});

const db = admin.firestore();

module.exports = {};
