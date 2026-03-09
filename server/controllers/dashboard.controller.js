const Project = require('../model/Project.model');
const Offer = require('../model/Offer.model');
const Review = require('../model/Review.model');

const getDashboardStats = async (req, res) => {
    try {
        const [projectCount, offerCount, reviewCount] = await Promise.all([
            Project.countDocuments(),
            Offer.countDocuments(),
            Review.countDocuments()
        ]);
        res.status(200).json({
            projectsCount: projectCount,
            offersCount: offerCount,
            reviewsCount: reviewCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDashboardStats };