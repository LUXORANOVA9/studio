const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
const serviceAccount = require('./serviceAccountKey.json'); // Ensure this file exists

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-firebase-project.firebaseio.com"
});

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'No token provided.' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).send({ message: 'Invalid token.' });
  }
};

// Function to set custom claims (roles) for users
const setUserRole = async (uid, role) => {
    try {
        await admin.auth().setCustomUserClaims(uid, { role: role });
        console.log(`Successfully set custom claims for user: ${uid} with role: ${role}`);
    } catch (error) {
        console.error("Error setting custom claims:", error);
    }
};

module.exports = { admin, verifyToken, setUserRole };
