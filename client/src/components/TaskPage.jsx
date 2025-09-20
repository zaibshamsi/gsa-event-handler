import qrCodeImage from "../assets/qr1.jpg"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Remember to add your QR code image to `src/assets/`
// import qrCodeImage from '../assets/my-qr-code.png';

const TaskPage = () => {
     
    const geminiLink = "https://aiskillshouse.com/student/qr-mediator.html?uid=6067&promptId=17";
     const [linkClicked, setLinkClicked] = useState(false);
     const navigate = useNavigate();

     const handleProceed = () => {
        navigate('/upload');
    };

    // --- NEW: This function runs when the Gemini link is clicked ---
    const handleLinkClick = () => {
        setLinkClicked(true);
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Step 1: Try Gemini</h1>
            <p className="text-lg mb-8 max-w-lg text-gray-300">
                To claim your reward, you first need to interact with Gemini. Scan the QR code or click the link below to get started.
            </p>

            <div className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl mb-8 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                {/* QR Code Section */}
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-4">Scan Me</h2>
                    <div className="w-40 h-40 md:w-48 md:h-48 bg-white flex items-center justify-center rounded-md p-2">
                        {/* <img src={qrCodeImage} alt="Gemini QR Code" className="w-full h-full" /> */}
                        <span className="text-gray-600 text-sm mr-2"><img src={qrCodeImage} alt="qr1" /></span>
                    </div>
                </div>

                <div className="text-gray-400 text-2xl font-bold hidden md:block">OR</div>
                <div className="text-gray-400 font-bold md:hidden">OR</div>


                {/* Link Section */}
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-semibold mb-4">Click Me</h2>
                    <a
                        href={geminiLink}
                        target="_blank"
                        rel="noopener noreferrer"
                         onClick={handleLinkClick}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition duration-300"
                    >
                        Go to Gemini
                    </a>
                </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold mb-4">Step 2: Upload Proof</h2>
            <p className="text-lg mb-6 text-gray-300">
                After your chat, take a screenshot and come back to upload it.
            </p>

            <button
                onClick={handleProceed}
                disabled={!linkClicked} // Button is disabled if linkClicked is false
                className={`
                    font-bold py-3 px-10 rounded-lg text-xl shadow-lg transition duration-300
                    ${linkClicked 
                        ? 'bg-green-600 hover:bg-green-700' // Style for enabled button
                        : 'bg-gray-500 cursor-not-allowed' // Style for disabled button
                    }
                `}
            >
                {linkClicked ? 'Proceed to Upload' : 'Click the Link Above to Unlock'}
            </button>
        </div>
    );
};

export default TaskPage;