const Product = require('../models/product');


//All products list
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',

    });
  });
};

//Add product form page
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,

  });
};

//Add product endpoint
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

//Edit Product page
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (editMode === "false") {
    res.redirect('/admin/products')
  }

  const productId = (req.params.productId);
  Product.findById(productId, (product) => {
    res.render('admin/edit-product', {
      product: product,
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
    })
  })
}

//Edit Product form endpoint
exports.postEditProduct = (req, res) => {
  const { productId, title, imageUrl, price, description } = req.body;
  const product = new Product(productId, title, imageUrl, description, price);
  // create new instance 
  product.save();
  //overwriting on the already saved data
  res.redirect('/admin/products')
}

//delete product form endpoint
exports.postDeleteProduct = (req, res) => {
  const productId = req.body.productId;
  //calling method from Product class to delete this product;
  Product.deleteProduct(productId);
  //redirect to admin products list
  res.redirect('/admin/products')
}