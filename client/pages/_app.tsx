import React from 'react';
import { AuthProvider } from '../components/AuthContext';
import '../styles/globals.css'; // Assuming you have global styles

const App: React.FC<{ Component: any; pageProps: any }> = ({ Component, pageProps }) => {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
};

export default App;
