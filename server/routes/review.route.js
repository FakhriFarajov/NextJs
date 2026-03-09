const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews.controller');

router.get('/', reviewsController.getAllReviews);
router.get('/:id', reviewsController.getReviewById);
router.post('/', reviewsController.createReview);
router.patch('/:id', reviewsController.updateReview);
router.delete('/:id', reviewsController.deleteReview);

module.exports = router;