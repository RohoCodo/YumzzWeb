const functions = require('firebase-functions');
const admin = require('firebase-admin');
const CryptoJS = require('crypto-js');
const cors = require('cors');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();

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

// Function to encrypt the password
function encryptPassword(password) {
  // Use CryptoJS AES encryption (replace 'YOUR_SECRET_KEY' with a secure key)
  const secretKey = 'YumzzIsBest';
  const encryptedPassword = CryptoJS.AES.encrypt(password, secretKey).toString();
  return encryptedPassword;
}

function decryptPassword(encryptedPassword) {
    // Use CryptoJS AES decryption (replace 'YOUR_SECRET_KEY' with the same secure key used for encryption)
    const secretKey = 'YumzzIsBest';
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedPassword, secretKey);
    const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedPassword;
  }

// Function to sign up user and store information in Firebase Realtime Database
exports.signUp = functions.https.onRequest((req, resp) => {
    cors(req, resp, () => {
      try {
        // const { email, password, username, ownername } = req.body;
        let e = req.body.email;
        let p = req.body.password;
        let u = req.body.username;
        let o = req.body.ownername;
        // let x = 0;
  
        admin
          .firestore()
          .collection('RestaurantUser')
          .add({
            email: e,
            password: encryptPassword(p),
            username: u,
            ownername: o,
          })
          .then(() => {
            console.log('Successfully added new restaurant');
            resp.status(200).send('Added new restaurant');
            return null;
          })
          .catch((error) => {
            console.log('Error adding email:', error);
            resp.status(500).send(`Not added. Something wrong with user ${email}`);
            return null;
          });
      } catch (error) {
        console.error('Error during user sign up:', error.message);
        resp.status(500).send('Error during user sign up.');
      }
    });
});

exports.signIn = functions.https.onRequest((req, resp) => {
    try {
      cors(req, resp, () => {
        const db = admin.firestore()
        const collectionName = 'RestaurantUser';
        let rn = req.body.restaurantName;
        let p = req.body.password;

        const conditions = [
            { field: 'RestaurantName', operator: '==', value: rn },
            { field: 'Password', operator: '==', value: encryptPassword(p)},
          ];

        let query = db.collection(collectionName);
        conditions.forEach((condition) => {
            query = query.where(condition.field, condition.operator, condition.value);
        });

    // Execute the query
        query.get()
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
            // At least one document matches the conditions
            // Only one should which equals successful login
            console.log('SUCCESS!');
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                console.log('Document ID:', doc.id);
                console.log('Document Data:', data);
            });
            return true;
            } else {
            // No documents match the conditions
            // Restaurant Name and Password do not match
            console.log('No documents match the conditions.');
            return false;
            }
        })
        .catch((error) => {
            console.error('Error getting documents:', error);
            return false;
        });
        });
    }
    catch (error) {
        console.error('Error during sign-in:', error.message);
        return { success: false, message: 'Error during sign-in.' };
    }
  });

// Assuming you have already initialized Firebase in your client-side code
// const signUpFunction = firebase.functions().httpsCallable('signUp');

// // Call the Cloud Function with user data
// signUpFunction({ email: 'user@example.com', password: 'password123', restaurantName: 'Example Restaurant' })
//   .then((result) => {
//     console.log(result.data.message);
//   })
//   .catch((error) => {
//     console.error('Error during sign up:', error.message);
//   });

