const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', { docTitle: 'Add Product', path: '/admin/add-product' })
}

exports.addNewProduct = (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    res.render('shop', { prods: products, docTitle: 'SHOP', path: '/', hasProducts: products.length > 0 });
}