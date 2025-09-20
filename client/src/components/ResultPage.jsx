import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

const ResultPage = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    const message = params.get('message');

    // --- IMPORTANT: REPLACE THIS WITH YOUR OFFICIAL REWARD LINK ---
    const geminiProOfferLink = "https://gemini.google/students";

    useEffect(() => {
        if (status === 'success') {
            const timer = setTimeout(() => {
                window.location.href = geminiProOfferLink;
            }, 3000); // Redirect after 3 seconds

            return () => clearTimeout(timer);
        }
    }, [status]);

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
                <h1 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">Verification Successful!</h1>
                <p className="text-lg mb-6">You are now being redirected to the Gemini Pro offer page.</p>
                <p>If not redirected, <a href={geminiProOfferLink} className="text-blue-400 underline">click here</a>.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <h1 className="text-3xl md:text-4xl font-bold text-red-500 mb-4">Verification Failed</h1>
            <p className="text-lg mb-6">{message || 'Something went wrong. Please try again.'}</p>
            <Link to="/upload" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                Try Again
            </Link>
        </div>
    );
};

export default ResultPage;