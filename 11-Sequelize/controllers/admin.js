const Product = require('../models/product');


//All products list
exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
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
  console.log("image", imageUrl)
  Product.create({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })
    .then(result => {
      console.log('<----Created Product---->')
      res.redirect('/admin/products');
    })
    .catch(err => console.log('<----Error creating product---->'));

};

//Edit Product page
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (editMode === "false") {
    res.redirect('/admin/products')
  }

  const productId = (req.params.productId);
  Product.findByPk(productId).then((product) => {
    res.render('admin/edit-product', {
      product: product,
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
    })
  })
    .catch(err => console.log("<--Error-->", err))
}

//Edit Product form endpoint
exports.postEditProduct = (req, res) => {
  const { productId, title, imageUrl, price, description } = req.body;

  Product.findByPk(productId)
    .then(product => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;
      return product.save();
    })
    .then(result => {
      res.redirect('/admin/products')
      console.log("<----UPDATED PRODUCT---->")
    })
    .catch(err => console.log("<----Error Updating Product---->"))

  //overwriting on the already saved data

}

//delete product form endpoint
exports.postDeleteProduct = (req, res) => {
  const productId = req.body.productId;
  Product.findByPk(productId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log("<---Product Deleted---->");
      res.redirect('/admin/products')
    })
    .catch(err => console.log("<----Error Deleting Product---->"))
  //redirect to admin products list
}