import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file to upload.');
            return;
        }

        setUploading(true);
        setError('');

        const formData = new FormData();
        formData.append('screenshot', file);

        try {
            const token = localStorage.getItem('token');
            const res = await axios.post('https://gsa-event-handler-z998.onrender.com/api/verify/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'x-auth-token': token,
                },
            });

            if (res.data.success) {
                navigate('/result?status=success');
            } else {
                navigate(`/result?status=failed&message=${encodeURIComponent(res.data.msg)}`);
            }
        } catch (err) {
            const errorMessage = err.response?.data?.msg || 'An unexpected error occurred.';
            navigate(`/result?status=failed&message=${encodeURIComponent(errorMessage)}`);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Verify Your Screenshot</h1>
            <p className="text-md mb-8 text-gray-400 text-center">Upload a screenshot of your chat with Gemini to proceed.</p>
            
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="mb-4">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/png, image/jpeg, image/webp"
                        className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                <button
                    type="submit"
                    disabled={uploading || !file}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    {uploading ? 'Verifying...' : 'Upload and Verify'}
                </button>
            </form>
        </div>
    );
};

export default UploadPage;