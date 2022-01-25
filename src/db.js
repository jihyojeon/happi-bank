require('dotenv').config();
const admin = require('firebase-admin');

admin.initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID,
});

const db = admin.firestore();
const workspaces = db.collection('workspace');

const createSaving = async (workspaceId, dueDate) => {
  try {
    await workspaces.doc(`${workspaceId}`).set({
      dueDate: dueDate,
      pastYears: {},
      thisYear: [],
    });
  } catch (error) {
    console.error(error);
  }
};

const findSaving = async (workspaceId) => {
  try {
    const workspace = await workspaces.get(workspaceId);
    return workspace.exists ? workspace : false;
  } catch (error) {
    console.error(error);
  }
};

const test = async () => {
  try {
    await db.collection('test_table').doc(`test_element`).set({
      testkey: 'testvalue',
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = { findSaving };
