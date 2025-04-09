const express = require('express');
const router = express.Router();
const { getFinance, addFinance } = require('../controllers/financeController');

router.get('/', getFinance);
router.post('/', addFinance);

module.exports = router;