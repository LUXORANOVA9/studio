'use client';

import React, {useState, useEffect} from 'react';
import { FirebaseApp, initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
import {Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let firebaseApp;
if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
} else {
    firebaseApp = getApps()[0];
}

const db = getFirestore(firebaseApp);

export default function Admin() {
    const [mintLogs, setMintLogs] = useState([]);

    useEffect(() => {
        loadMintLogs();
    }, []);

    async function loadMintLogs() {
        const logsRef = collection(db, "mint_logs");
        const q = query(logsRef, orderBy("mintedAt", "desc"));
        const querySnapshot = await getDocs(q);
        const logs = [];

        querySnapshot.forEach(doc => {
            logs.push({
                id: doc.id,
                ...doc.data()
            });
        });

        setMintLogs(logs);
    }

    return (
       <div className="p-6">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Mint Logs - Admin View</CardTitle>
                    <CardDescription>Shows log of all minted scrolls. (wallet, txHash, timestamp)</CardDescription>
                </CardHeader>
                <CardContent>
                    <table className="w-full">
                        <thead>
                        <tr>
                            <th className="text-left">Wallet</th>
                            <th className="text-left">Transaction Hash</th>
                            <th className="text-left">Timestamp</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mintLogs.map(log => (
                            <tr key={log.id}>
                                <td>{log.wallet}</td>
                                <td>{log.txHash}</td>
                                <td>{log.mintedAt?.toDate().toLocaleString()}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    );
}
