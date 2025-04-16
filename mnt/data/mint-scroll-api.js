const express = require('express');
const { ethers } = require('ethers');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const provider = new ethers.JsonRpcProvider(process.env.MUMBAI_RPC);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, require('./abi.json'), signer);

app.post('/mint-scroll', async (req, res) => {
  const { walletAddress, scrollId, amount } = req.body;

  try {
    const tx = await contract.mint(walletAddress, scrollId, amount, "0x");
    await tx.wait();

    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3000, () => console.log('Mint API running on port 3000'));