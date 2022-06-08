const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.onCreateFunc = functions.firestore
  .document("Farms/{farm}")
  .onCreate(async (snap, context) => {
    try {
      const newValue = snap.data();
      const snapRef = snap.ref;

      const afterUpdate = await snapRef.update({
        createdAt: new Date().toLocaleString(),
      });

      //   await updateDoc(snapRef, {
      //     createdAt: "1/1/1990",
      //   });

      console.log("afterUpdate", afterUpdate);
    } catch (error) {
      console.log("ERROR in TESTFUN: ", error);
    }
  });

exports.onUpdateFunc = functions.firestore
  .document("Farms/{farm}")
  .onUpdate((change, context) => {
    // Retrieve the current and previous value
    const data = change.after.data();
    const previousData = change.before.data();

    console.log("data: ", data);

    const isEqual = (...objects) =>
      objects.every(
        (obj) => JSON.stringify(obj) === JSON.stringify(objects[0])
      );

    console.log("before: ", previousData, "current: ", data);
    console.log("what is equal", isEqual(data, previousData));

    // We'll only update if the name has changed.
    // This is crucial to prevent infinite loops.
    if (
      data.displayName == previousData.displayName &&
      data.image == previousData.image &&
      data.name == previousData.name &&
      data.openHours == previousData.openHours &&
      data.phone == previousData.phone
    ) {
      return null;
    }

    // Retrieve the current count of name changes
    //   let count = data.name_change_count;
    //   if (!count) {
    //     count = 0;
    //   }

    // Then return a promise of a set operation to update the count
    return change.after.ref.set(
      {
        updatedAt: new Date().toLocaleString(),
      },
      { merge: true }
    );
  });
