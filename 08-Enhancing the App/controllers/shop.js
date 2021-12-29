const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
    Product.fecthAll((products) => {
        res.render('shop/index', { prods: products, docTitle: 'Shop', path: '/', hasProducts: products.length > 0 });
    });
}

exports.getProducts = (req, res, next) => {
    Product.fecthAll((products) => {
        res.render('shop/product-list', { prods: products, docTitle: 'All Products', path: '/products', hasProducts: products.length > 0 });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', { docTitle: 'Cart', path: '/cart' });
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', { docTitle: 'Checkoutt', path: '/checkout' });
}