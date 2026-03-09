const express = require('express');
const router = express.Router();
const projectsRoute = require('./projects.route');
const reviewsRoute = require('./review.route');
const offersRoute = require('./offer.route');

router.use('/projects', projectsRoute);
router.use('/reviews', reviewsRoute);
router.use('/offers', offersRoute);

module.exports = router;