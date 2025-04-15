import React from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const IndexPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Welcome to LuxoraNova</h1>
            <div className="flex space-x-4">
                <LoginForm />
                <SignupForm />
            </div>
        </div>
    );
};

export default IndexPage;
