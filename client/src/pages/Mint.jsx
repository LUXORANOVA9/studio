
import React, {useState, useEffect} from 'react';
import { ethers } from 'ethers';
import {Button} from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { FirebaseApp, initializeApp, getApps } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { useAuth } from '../components/AuthContext'; // Import useAuth hook

const CONTRACT_ADDRESS = "0x984190d20714618138C8bD1E031C3678FC40dbB0";

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase (check if already initialized)
let firebaseApp: FirebaseApp;
if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
} else {
    firebaseApp = getApps()[0]; // Use existing app
}

const db = getFirestore(firebaseApp);

export default function Mint() {
    const [userWallet, setUserWallet] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const { user } = useAuth(); // Use the useAuth hook

    useEffect(() => {
        checkWalletConnection();
    }, []);

    const checkWalletConnection = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    setUserWallet(accounts[0]);
                    setIsConnected(true);
                } else {
                    console.log('No authorized account found');
                }
            } catch (error) {
                console.error("Error checking wallet connection:", error);
            }
        } else {
            console.log('MetaMask not detected');
        }
    };

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setUserWallet(accounts[0]);
                setIsConnected(true);

                 // Store the Ethereum address in Firebase
                 if (user) {
                    await setDoc(doc(db, "users", user.uid), {
                        ethAddress: accounts[0],
                    }, { merge: true });
                    alert('Wallet connected and Ethereum address stored in Firebase!');
                } else {
                    alert('Please sign in to connect your wallet.');
                }
            } catch (error) {
                console.error("User denied account access...");
            }
        } else {
            alert("MetaMask not detected. Please install MetaMask!");
        }
    };

    const mintScroll = async () => {
        const contractAddress = CONTRACT_ADDRESS;
        const contractABI = []; //  *REPLACE WITH YOUR ACTUAL CONTRACT ABI*

        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);

            try {
                const transaction = await contract.mint(1); // Replace '1' with the actual tokenId you wish to mint
                await transaction.wait();
                console.log("Minted successfully");
                alert("Scroll minted successfully!");
            } catch (error) {
                console.error("Error minting: ", error);
                alert("Failed to mint scroll.");
            }
        } else {
            alert("Please install Metamask");
        }
    };

    return (
        <div className="p-6">
              <Card className="w-full">
                <CardHeader>
                <CardTitle>Mint Your Clone Scroll</CardTitle>
                <CardDescription>Connect wallet and mint your scroll.</CardDescription>
                </CardHeader>
              <CardContent>
            {!isConnected ? (
                <Button onClick={connectWallet}>Connect Wallet</Button>
            ) : (
                <>
                    <p>Connected with wallet: {userWallet}</p>
                    <Button onClick={mintScroll}>Mint Scroll</Button>
                </>
            )}
          </CardContent>
        </Card>
        </div>
    );
}
