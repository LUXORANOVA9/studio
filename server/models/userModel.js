// server/models/userModel.js
// Basic user model (can be extended with additional fields)
module.exports = {
    // Placeholder: Define your user model here if needed
    ethAddress: String,
    luxoBalance: { type: Number, default: 0 }, // Add $LUXO token balance
    referralBonuses: { type: Number, default: 0 }
};
