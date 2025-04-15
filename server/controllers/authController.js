const { admin } = require('../auth/firebaseAdmin');

// Register a new user
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });

    console.log('Successfully created new user:', userRecord.uid);
    res.status(201).send({ message: 'User created successfully', uid: userRecord.uid });
  } catch (error) {
    console.error('Error creating new user:', error);
    res.status(500).send({ message: 'Failed to create user', error: error.message });
  }
};

// Login (using Firebase client-side SDK, then verify on server)
exports.login = async (req, res) => {
    // The login process is handled client-side with Firebase SDK
    // After successful login, the client sends the JWT token to the server
    // This function is placeholder, token verification is handled by verifyToken middleware
    res.status(200).send({ message: 'Login successful' });
};
