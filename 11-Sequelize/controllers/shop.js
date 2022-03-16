const Product = require('../models/product');
const Cart = require('../models/cart');

//Index home page 
exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log("<----Error Generated while fetching products---->"))

  // Product.fetchAll().then(([rows, fieldData]) => {

  // })

  //   .catch(err => console.log(err));
  // Product.fetchAll(products => {
  //   res.render('shop/index', {
  //     prods: products,
  //     pageTitle: 'Shop',
  //     path: '/'
  //   });
  // });
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log("<----Error Generated while fetching products---->"))
  // Product.fetchAll().then(([rows, fieldData]) => {
  //   res.render('shop/product-list', {
  //     prods: rows,
  //     pageTitle: 'All Products',
  //     path: '/products'
  //   });
  // })

  //   .catch(err => console.log(err));
};

exports.getProductDetail = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId).then((product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    })
  });
}


exports.getCart = (req, res, next) => {

  req.user
  .getCart()
  .then(cart => {
    return cart.getProducts();
  })
  .then(products =>{
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products
    });
  })
  .catch(err => console.log(`<----Error Generated while fetching cart---->`))

  // Cart.getCart(cart => {
  //   const totalPrice = cart.totalPrice;
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     products.forEach(product => {
  //       const cartProductData = cart.products.find(item => item.id === product.id);
  //       if (cartProductData) {
  //         cartProducts.push({ ...product, quantity: cartProductData.quantity });
  //       }
  //     })
  //     console.log(cartProducts);
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       products: cartProducts,
  //       totalPrice: totalPrice,
  //       pageTitle: 'Your Cart'
  //     })
  //   })
  // });
};


//adds item to the cart for url add-to-cart
exports.postCart = (req, res, next) => {
  const productId = req.body.productId.trim();
  let fetchedcart;
  req.user
  .getCart()
  .then(cart =>{
    fetchedcart = cart;
    return cart.getProducts({where: {id: productId}});
    //get product if it is already in the cart
  })
  .then(products =>{
    let product;
    //check if the products array is not empty
    if(products.length > 0){
      product = products[0];
    }
    let newQuantity = 1;
    if(product){
      // if product already exist inccrease it by 1
      newQuantity = product.quantity + 1;
    }
    
    // if product is not already in cart, find it in the db
    Product.findByPk(productId)
    .then(product => {
      return fetchedcart.addProduct(product,{ through: { quantity: newQuantity } });
    })
    .catch(err => console.log(`<----Error Generated while fetching product---->`));
  })
  .then(result => {
    console.log(`<----Added to cart---->`)
    return res.redirect('/cart');
})
  .catch(err => console.log(`<----Error Generated while adding to cart---->`, err))
}


//deltew item from cart
exports.postDeleteCartItem = (req, res) => {
  const id = req.body.productId;
  Product.findById(id, product => {
    Cart.deleteProduct(id, product.price);
    res.redirect('/cart');
  })
}


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};


exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
