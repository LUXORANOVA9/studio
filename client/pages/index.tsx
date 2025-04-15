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
            {/* Cinematic Walkthrough and Teaser Trailer */}
            <div className="text-center mt-8">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Watch Cinematic Walkthrough
                </button>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-4">
                    View Teaser Trailer
                </button>
            </div>
        </div>
    );
};

export default IndexPage;
