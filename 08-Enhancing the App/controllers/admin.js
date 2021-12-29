const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', { docTitle: 'Add Product', path: '/admin/add-product' })
}

exports.getProducts = (req, res, next) => {
    Product.fecthAll((products) => {
        res.render('admin/products', { prods: products, docTitle: 'Admin Products', path: '/admin/products', hasProducts: products.length > 0 });
    });
}

exports.addNewProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}