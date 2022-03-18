const Product = require('../models/product');


// //All products list
exports.getProducts = (req, res, next) => {

  Product.fetchAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch(err => console.log("<--Error-->", err))

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

  const product = new Product(title, price, description, imageUrl);
  product.save()
    .then(result => {
      console.log('Added Product');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};


// //Edit Product page
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (editMode === "false") {
    res.redirect('/admin/products')
  }

  const productId = (req.params.productId);
  Product.findById(productId).then((product) => { //products will be an array even if its empty
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      product: product,
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
    })
  })
    .catch(err => console.log("<--Error-->", err))
}

// //Edit Product form endpoint
exports.postEditProduct = (req, res) => {
  const { productId, title, imageUrl, price, description } = req.body;

  Product.updateProduct(productId, title, price, description, imageUrl)
    .then(result => {
      console.log("<----UPDATED PRODUCT---->", result)
      res.redirect('/admin/products')
    })
    .catch(err => console.log("<----Error Updating Product---->", err))

  //overwriting on the already saved data

}

// //delete product form endpoint
exports.postDeleteProduct = (req, res) => {
  const productId = req.body.productId;
  Product.deleteById(productId)
    .then(result => {
      console.log(`Product deleted with id: ${productId}`);
      res.redirect('/admin/products')
    })
    .catch(err => console.log("<----Error Deleting Product---->"))
  //redirect to admin products list
}