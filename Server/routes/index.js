const express = require('express');
const router = express.Router();


router.use('/users', require('./users'));
router.use('/scrap', require('./scrap'));

console.log('Router loaded');
module.exports = router;