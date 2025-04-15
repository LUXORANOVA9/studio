'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { FirebaseApp, initializeApp, getApps } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { ethers } from 'ethers';

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

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

interface AuthContextProps {
    user: User | null;
    userRole: string | null;
    loading: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    userRole: null,
    loading: true,
    login: () => {},
    logout: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                try {
                    const role = await checkNftOwnership(user.uid);
                    setUserRole(role);
                } catch (error) {
                    console.error("Error checking NFT ownership:", error);
                    setUserRole('client'); // Default role
                }
            } else {
                setUser(null);
                setUserRole(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const checkNftOwnership = async (userId: string): Promise<string> => {
      // Placeholder: Implement logic to fetch user's NFT ownership and determine role
      // - Fetch the contract address and provider from environment variables.
      // - Connect to the contract using ethers.js.
      // - Check if the user owns any of the specific NFTs (Gold, Platinum, Titanium).
      // - Assign roles based on NFT ownership.
      // - Return the appropriate role string ('superadmin', 'admin', 'broker', 'client').
        const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
        const providerUrl = process.env.NEXT_PUBLIC_PROVIDER_URL;

        if (!contractAddress || !providerUrl) {
            console.error("Contract address or provider URL not set in environment variables.");
            return 'client'; // Default role
        }

        try {
            const provider = new ethers.providers.JsonRpcProvider(providerUrl);
            const contract = new ethers.Contract(contractAddress, ["function balanceOf(address account, uint256 id) view returns (uint256)"], provider);

            // Get the user's Ethereum address from Firebase (you might need to store it)
            // Assuming you have a way to map Firebase UID to Ethereum address
            const ethAddress = await getEthAddressFromFirebase(userId);
            if (!ethAddress) {
                return 'client';
            }

            const goldBalance = await contract.balanceOf(ethAddress, 1);
            const platinumBalance = await contract.balanceOf(ethAddress, 2);
            const titaniumBalance = await contract.balanceOf(ethAddress, 3);

            if (titaniumBalance > 0) return 'superadmin';
            if (platinumBalance > 0) return 'admin';
            if (goldBalance > 0) return 'broker';

            return 'client';
        } catch (error) {
            console.error("Error checking NFT balance:", error);
            return 'client';
        }
    };

    const getEthAddressFromFirebase = async (userId: string): Promise<string | null> => {
        try {
            const userDocRef = doc(db, "users", userId);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                return userData?.ethAddress || null;
            } else {
                console.log("User document not found in Firestore.");
                return null;
            }
        } catch (error) {
            console.error("Error fetching user document from Firestore:", error);
            return null;
        }
    };

    const login = async () => {
        // Implement login functionality (e.g., using Firebase auth)
    };

    const logout = async () => {
        // Implement logout functionality
    };

    const value: AuthContextProps = {
        user,
        userRole,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
