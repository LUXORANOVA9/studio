import React from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import LandingPage from '../components/LandingPage';

const IndexPage: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <LandingPage />
        </div>
    );
};

export default IndexPage;
