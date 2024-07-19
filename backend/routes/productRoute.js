// product api's

const express = require('express');
const router = express.Router();
const productController = require('../controller/productContoller');
const productTranController = require('../controller/productTranController');
const totalController = require('../controller/totalController');

router.get('/all-product', productController.getAllProducts);
router.post('/send-data', productController.getData);
router.get('/transaction', productTranController.transaction);
router.get('/total', totalController.total);
router.get('/bar', productTranController.barChart);
router.get('/pie', productTranController.pieChart);

module.exports = router;