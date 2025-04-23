 // LuxoraNova: Secure Stripe Key Storage & Integration
 import express from 'express';
 import Stripe from 'stripe';
 import dotenv from 'dotenv';
 import fs from 'fs';
 import path from 'path';

 dotenv.config();
 const router = express.Router();

 const STRIPE_SECRET_FILE = path.join(process.cwd(), '.stripe_secret_key');

 router.post('/api/set-stripe-key', express.json(), (req, res) => {
   const { secretKey } = req.body;
   if (!secretKey || !secretKey.startsWith('sk_test_')) {
     return res.status(400).json({ error: 'Invalid test key format.' });
   }
   fs.writeFileSync(STRIPE_SECRET_FILE, secretKey, { encoding: 'utf-8' });
   res.status(200).json({ success: true, message: 'Stripe key stored securely.' });
 });

 router.get('/api/get-stripe-key', (req, res) => {
   if (!fs.existsSync(STRIPE_SECRET_FILE)) {
     return res.status(404).json({ error: 'Stripe key not set.' });
   }
   const key = fs.readFileSync(STRIPE_SECRET_FILE, 'utf-8');
   res.json({ key });
 });
