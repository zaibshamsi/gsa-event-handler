const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const authMiddleware = require('../middleware/auth');
const Student = require('../models/User');
const Engagement = require('../models/Engagement');

// Multer setup for in-memory file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to convert buffer to base64
function bufferToGenerativePart(buffer, mimeType) {
  return {
    inlineData: {
      data: buffer.toString("base64"),
      mimeType
    },
  };
}

// @route   POST /api/verify/upload
// @desc    Upload screenshot and verify with Gemini
// @access  Private
router.post('/upload', [authMiddleware, upload.single('screenshot')], async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ msg: 'No file uploaded.' });
  }

  try {
    const user = await Student.findById(req.user.id);
    if (user.isVerified) {
        return res.status(400).json({ msg: 'User has already been verified.' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-05-20" });
    const prompt = "Does this image appear to be a screenshot of a user interacting with the Gemini (gemini.google.com) web or app interface? Answer with only 'Yes' or 'No'.";

    const imagePart = bufferToGenerativePart(req.file.buffer, req.file.mimetype);

    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    const text = response.text().trim().toUpperCase();

    if (text === 'YES') {
      // Mark user as verified
      user.isVerified = true;
      await user.save();

      // Increment the engagement counter
      await Engagement.increment();

      return res.json({ success: true, msg: 'Verification successful.' });
    } else {
      return res.json({ success: false, msg: 'Verification failed. The image does not appear to be a valid Gemini screenshot.' });
    }
  } catch (error) {
    console.error('Error during Gemini API call:', error);
    res.status(500).send('Server error during verification.');
  }
});

module.exports = router;