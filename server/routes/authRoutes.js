const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, setUserRole } = require('../auth/firebaseAdmin'); // Import setUserRole

router.post('/register', authController.register);
router.post('/login', authController.login);

// Add a new route to set the user role (accessible only by admin)
router.post('/set-role', verifyToken, async (req, res) => {
    const { uid, role } = req.body;

    try {
        // Check if the user making the request has admin privileges (you may modify the check)
        if (req.user.role !== 'superadmin') {
            return res.status(403).send({ message: 'Unauthorized: Only superadmins can set user roles.' });
        }

        // Set the role using the imported function
        await setUserRole(uid, role);
        res.status(200).send({ message: `Successfully set role for user ${uid} to ${role}.` });
    } catch (error) {
        console.error('Error setting user role:', error);
        res.status(500).send({ message: 'Failed to set user role', error: error.message });
    }
});

module.exports = router;
