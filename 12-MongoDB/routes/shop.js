const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProductDetail)

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-delete-item', shopController.postDeleteCartItem)

router.get('/orders', shopController.getOrders);

router.post('/create-order', shopController.postCreateOrder);

// router.get('/checkout', shopController.getCheckout);


module.exports = router;
