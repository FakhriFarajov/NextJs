const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'freelance', 'contract', 'internships'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Offer = mongoose.model('Offer', offerSchema);

module.exports = Offer;