const express = require('express');
const router = express.Router();
const offersController = require('../controllers/offers.controller');

router.get('/', offersController.getAllOffers);
router.get('/:id', offersController.getOfferById);
router.post('/', offersController.createOffer);
router.patch('/:id', offersController.updateOffer);
router.delete('/:id', offersController.deleteOffer);

module.exports = router;
