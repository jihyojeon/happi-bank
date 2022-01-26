require('dotenv').config();
const admin = require('firebase-admin');

admin.initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID,
});

const db = admin.firestore();
const workspaces = db.collection('workspace');
const FieldValue = admin.firestore.FieldValue;

const findSaving = async ({ workspaceId }) => {
  try {
    const workspace = await workspaces.doc(workspaceId).get();
    return workspace.exists ? workspace.data() : false;
  } catch (error) {
    console.error(error);
  }
};

const createSaving = async ({ workspaceId, dueDate }) => {
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

const updateSaving = async ({ workspaceId, context }) => {
  try {
    await workspaces.doc(`${workspaceId}`).update({
      thisYear: FieldValue.arrayUnion(context),
    });
  } catch (error) {
    console.error(error);
  }
};

const stuffingThisYear = async ({ workspaceId, YYYY }) => {
  try {
    const happiBank = await findSaving({ workspaceId });
    const thisYear = {};
    thisYear[YYYY] = happiBank.thisYear;
    await workspaces.doc(`${workspaceId}`).update({
      pastYears: { ...thisYear },
    });
  } catch (error) {
    console.error(error);
  }
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const popMemory = async ({ workspaceId }) => {
  try {
    const happiBank = await findSaving({ workspaceId });
    const thisYear = happiBank.thisYear;
    const memory = thisYear[getRandomInt(thisYear.length)];
    console.log(memory);
    await workspaces.doc(`${workspaceId}`).update({
      thisYear: FieldValue.arrayRemove(memory),
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  createSaving,
  findSaving,
  updateSaving,
  stuffingThisYear,
  popMemory,
};
