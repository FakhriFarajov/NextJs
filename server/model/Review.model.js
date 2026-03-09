const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    imageObjectName: { type: String, required: true },
    company: { type: String, required: true },
    role: { type: String, required: true },
    review: {
        az: { type: String, required: true },
        ru: { type: String, required: true },
        en: { type: String, required: true }
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

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
