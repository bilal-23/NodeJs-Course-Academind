const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');
const User = require('../models/user');

//<-- / route,  -->
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log("<----Error Generated while fetching products---->"))
};

//<-- /products route -->
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log("<----Error Generated while fetching products---->"))
};

// get single product
exports.getProductDetail = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then((product) => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      })
    });
}


exports.getCart = (req, res, next) => {
  req.user.getCart().then(products => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products
    });
  });

};


//adds item to the cart for url add-to-cart
exports.postCart = (req, res, next) => {
  const productId = req.body.productId.trim();
  Product.findById(productId).then(product => {
    return req.user.addToCart(product)
  })
    .then(result => {
      console.log('Added product to cart', result)
      res.redirect('/cart')
    })
    .catch(err => console.log(`<----Error Generated while adding to cart---->`, err));
}


//deltew item from cart
exports.postDeleteCartItem = (req, res) => {
  const prodId = req.body.productId;
  req.user.deleteCartItem(prodId)
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
    })
}


exports.getOrders = (req, res, next) => {
  req.user.getOrders({ include: ['products'] }) //get all products related to this order, all done by sequelize
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    }
    )
    .catch(err => console.log(`<----Error Generated while fetching orders---->`))

};

exports.postCreateOrder = (req, res, next) => {
  let fetchedCart;
  //get all the cart items
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      //user has many orders
      req.user.createOrder()
        .then(order => {
          return order.addProducts(products.map(product => {
            product.orderItem = {
              quantity: product.cartItem.quantity
            }
            return product;
          }))
        })
    })
    .then(result => {
      return fetchedCart.setProducts(null); //drops all items in cart
    })
    .then(result => {
      res.redirect('/orders')
    })
    .catch(err => console.log(`<----Error Generated while posting order from cart---->`, err))
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
