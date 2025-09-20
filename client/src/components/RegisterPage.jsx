import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { displayName, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/task');
        } catch (err) {
            setError(err.response.data.msg || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            
            {/* - `text-3xl` is the default for mobile.
              - `md:text-4xl` makes it larger on medium screens and up.
              - `text-center` ensures it looks good on narrow screens.
            */}
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Create Your Account</h1>

            {/*
              - `p-6` is the default padding for mobile.
              - `sm:p-8` increases padding on small screens and up.
            */}
            <form onSubmit={onSubmit} className="w-full max-w-sm bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl">
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                
                <div className="mb-4">
                    <label className="block text-gray-400 mb-2" htmlFor="displayName">Display Name</label>
                    <input type="text" name="displayName" value={displayName} onChange={onChange} required className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-400 mb-2" htmlFor="email">Email Address</label>
                    <input type="email" name="email" value={email} onChange={onChange} required className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                
                <div className="mb-6">
                    <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                    <input type="password" name="password" value={password} onChange={onChange} minLength="6" required className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                
                <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">Register</button>
            </form>
            
            <p className="mt-4">Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link></p>
        </div>
    );
};

export default RegisterPage;