const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/seller');



router.post('/submit', sellerController.addItemDetails);

router.get('/:number/:productId', sellerController.updateItemDetail);

router.use('/', sellerController.getItemDetails);





module.exports = router;