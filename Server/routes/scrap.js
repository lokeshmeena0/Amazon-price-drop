const express = require('express');
const router = express.Router();
const scrapController = require('../controllers/scrap_controller');

router.post('/scrapit', scrapController.scrapper);
router.get('/destroy/:id', scrapController.destroy);

module.exports = router;