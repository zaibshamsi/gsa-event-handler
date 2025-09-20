const mongoose = require('mongoose');

const EngagementSchema = new mongoose.Schema({
    key: {
        type: String,
        default: 'verificationCounter',
        unique: true
    },
    count: {
        type: Number,
        default: 0
    }
});

// Method to increment the counter
EngagementSchema.statics.increment = async function() {
    await this.findOneAndUpdate(
        { key: 'verificationCounter' },
        { $inc: { count: 1 } },
        { upsert: true, new: true } // Creates the doc if it doesn't exist
    );
};

module.exports = mongoose.model('Engagement', EngagementSchema);