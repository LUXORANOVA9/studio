import shutil
from pathlib import Path

# Prepare deployment folder
deploy_dir = Path("/mnt/data/luxoranova_firebase_bundle")
public_dir = deploy_dir / "public"
public_dir.mkdir(parents=True, exist_ok=True)

# Write index.html (from Admin Panel Mint Logs canvas state)
index_html = public_dir / "index.html"
index_html.write_text("""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Clone Licensing Store | LuxoraNova</title>
  <script type="module">
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
    import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.appspot.com",
      messagingSenderId: "SENDER_ID",
      appId: "APP_ID"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    let userWallet = "";

    async function connectWallet() {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          userWallet = accounts[0];
          document.getElementById('wallet-status').innerText = `Connected Wallet: ${userWallet}`;
        } catch (error) {
          alert('Wallet connection rejected.');
        }
      } else {
        alert('MetaMask is not installed.');
      }
    }

    async function handleMint() {
      if (!userWallet) return alert('Please connect your wallet first.');
      const response = await fetch("https://luxoranova-smartcontract-api/mint-scroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet: userWallet })
      });
      const data = await response.json();
      if (data.success) {
        await addDoc(collection(db, "mint_logs"), {
          wallet: userWallet,
          txHash: data.txHash,
          mintedAt: serverTimestamp()
        });
        alert("Scroll Minted Successfully!\\nTransaction: " + data.txHash);
      } else {
        alert("Minting failed: " + data.message);
      }
    }

    window.connectWallet = connectWallet;
    window.handleMint = handleMint;
  </script>
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333; }
    .container { width: 80%; margin: auto; overflow: hidden; }
    header { background: #1A237E; color: white; padding-top: 30px; min-height: 70px; border-bottom: #00BCD4 3px solid; }
    header h1 { text-align: center; }
    header p { text-align: center; }
    section { padding: 20px; }
    .feature { border: 1px solid #ddd; margin-bottom: 10px; padding: 10px; background: white; }
    footer { text-align: center; padding: 10px; margin-top: 20px; color: white; background-color: #1A237E; }
    .cta { text-align: center; margin-top: 30px; }
    .cta button { padding: 10px 20px; background-color: #00BCD4; border: none; color: white; font-size: 16px; cursor: pointer; margin: 10px; }
    .wallet-status { margin-top: 10px; font-weight: bold; color: #1A237E; }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <h1>Launch Your Own Fintech Empire</h1>
      <p>Clone LuxoraNova in your country with one click. No code. No delays. Total control.</p>
    </div>
  </header>
  <section class="container">
    <h2>Why License a LuxoraNova Clone?</h2>
    <div class="feature">Pre-built AI Dashboards (LUXBot + SORA) out of the box.</div>
    <div class="feature">White-label your own brand instantly.</div>
    <div class="feature">NFT Scroll license + blockchain-backed verification.</div>
    <div class="feature">Revenue-sharing model with low upfront cost.</div>
    <div class="feature">Fully scalable Firebase + GitHub backend.</div>
  </section>
  <div class="cta">
    <p>Ready to claim your territory?</p>
    <button onclick="connectWallet()">Connect Wallet</button>
    <button onclick="handleMint()">Mint Your Clone License</button>
    <p class="wallet-status" id="wallet-status"></p>
    <a href="/admin.html" target="_blank" style="display:block; margin-top:20px; font-weight:bold;">🔐 View Mint Logs (Admin Panel)</a>
  </div>
  <footer>
    <div class="container">
      <p>&copy; 2025 LuxoraNova Clone Licensing Engine</p>
    </div>
  </footer>
</body>
</html>""")

# Firebase config
firebase_json = deploy_dir / "firebase.json"
firebase_json.write_text("""
{
  "hosting": {
    "public": "public",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      { "source": "**", "destination": "/index.html" }
    ]
  }
}
""".strip())

# Zip and return path
zip_path = shutil.make_archive(str(deploy_dir), 'zip', str(deploy_dir))
zip_path
