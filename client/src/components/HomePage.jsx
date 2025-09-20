import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl mb-4 text-blue-400">
                Unlock Gemini Pro
            </h1>
            <p className="text-lg mb-8 max-w-md md:max-w-xl">
                Verify your interaction with Gemini to claim 1 year of Gemini Pro for free. Create an account or log in to get started.
            </p>
            {/* Stacks buttons on mobile, side-by-side on larger screens */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                    to="/login"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 w-48 text-center"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 w-48 text-center"
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default HomePage;