const mongoose = require('mongoose')
const { unique } = require('next/dist/build/utils')
const { getDisplayName } = require('next/dist/shared/lib/utils')

const StudentSchema =new mongoose.Schema({
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model( 'Students', StudentSchema );