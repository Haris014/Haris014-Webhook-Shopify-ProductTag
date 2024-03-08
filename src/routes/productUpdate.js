const express = require('express');
const { verifyWebhook } = require('../middlewares/verifyWebhook');
const { updateProduct } = require('../controller/productUpdate');

const router = express.Router();

router.route('/update').post(verifyWebhook, updateProduct);

module.exports = router;