const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.addBusinessEmail = functions.https.onRequest((req, resp) => {
  cors(req, resp, () => {
    //post info into feedback collection

    let e = req.body.email;

    admin
      .firestore()
      .collection("BusinessEmails")
      .add({
        email: e,
      })
      .then(function () {
        console.log("Successfully added business email");
        resp.status(200).send("Added email");
        return;
      })
      .catch(function (error) {
        console.log("Error adding email:", error);
        resp.status(500).send(`Not added. Something wrong with user ${email}`);
      });
  });
});
