const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', { docTitle: 'Add Product', path: '/admin/add-product' })
}

exports.addNewProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fecthAll((products) => {
        res.render('shop', { prods: products, docTitle: 'SHOP', path: '/', hasProducts: products.length > 0 });
    });

}