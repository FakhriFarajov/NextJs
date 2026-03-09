const Review = require('../model/Review.model');
const cloudinary = require('../config/cloudinary');

const uploadImageToCloudinary = async (imageObjectName) => {
    if (imageObjectName && !imageObjectName.startsWith('http')) {
        const result = await cloudinary.uploader.upload(imageObjectName, { folder: 'reviews' });
        return result.secure_url;
    }
    return imageObjectName;
};

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        const { lang } = req.query;
        const reviewsWithCloudinary = reviews.map(r => ({
            ...r.toObject(),
            imageObjectName: r.imageObjectName
        }));
        if (lang && ['az', 'ru', 'en'].includes(lang)) {
            const filtered = reviewsWithCloudinary.map(r => ({
                ...r,
                review: r.review[lang]
            }));
            return res.status(200).json(filtered);
        }
        res.status(200).json(reviewsWithCloudinary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const { lang } = req.query;
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        const reviewObj = {
            ...review.toObject(),
            imageObjectName: review.imageObjectName
        };
        if (lang && ['az', 'ru', 'en'].includes(lang)) {
            return res.status(200).json({
                ...reviewObj,
                review: reviewObj.review[lang]
            });
        }
        res.status(200).json(reviewObj);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createReview = async (req, res) => {
    try {
        const { name, surname, imageObjectName, company, role, review } = req.body;
        if (!name || !surname || !imageObjectName || !company || !role || !review || !review.az || !review.ru || !review.en) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const imageUrl = await uploadImageToCloudinary(imageObjectName);
        const newReview = {
            name,
            surname,
            imageObjectName: imageUrl,
            company,
            role,
            review: {
                az: review.az,
                ru: review.ru,
                en: review.en
            }
        };
        const createdReview = await Review.create(newReview);
        res.status(201).json(createdReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, surname, imageObjectName, company, role, review } = req.body;
        if (!name || !surname || !imageObjectName || !company || !role || !review || !review.az || !review.ru || !review.en) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const imageUrl = await uploadImageToCloudinary(imageObjectName);
        const updatedReview = {
            name,
            surname,
            imageObjectName: imageUrl,
            company,
            role,
            review: {
                az: review.az,
                ru: review.ru,
                en: review.en
            }
        };
        const reviewDoc = await Review.findByIdAndUpdate(id, updatedReview, { returnDocument: 'after' });
        if (!reviewDoc) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(reviewDoc);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndDelete(id);
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllReviews,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
};