const express = require('express');
const router = express.Router();
const { ethers } = require("ethers");
const { admin } = require('../auth/firebaseAdmin');
const { getFirestore, collection, addDoc, serverTimestamp } = require('firebase/firestore');

// Initialize Firebase Admin SDK
const serviceAccount = require('../auth/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-firebase-project.firebaseio.com"
});

const db = getFirestore();

router.post('/mint-scroll', async (req, res) => {
    try {
        const { wallet } = req.body;
        const contractAddress = process.env.CONTRACT_ADDRESS;
        const contractABI = [];  *REPLACE WITH YOUR ACTUAL CONTRACT ABI*
        const provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_RPC_URL);
        const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const tx = await contract.mint(1); // Mint a Gold scroll (tokenId 1)
        await tx.wait();

        // Log mint in Firestore
        await addDoc(collection(db, "mint_logs"), {
            wallet: wallet,
            txHash: tx.hash,
            mintedAt: serverTimestamp()
        });

        res.status(200).send({ success: true, txHash: tx.hash });
    } catch (error) {
        console.error("Minting error:", error);
        res.status(500).send({ success: false, message: error.message });
    }
});

module.exports = router;
