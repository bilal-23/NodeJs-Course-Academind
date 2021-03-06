const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');

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
      // if product already exist increase quantity by 1
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
      return fetchedcart.addProduct(product, {through:{
        quantity: newQuantity
      }})

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
  const prodId = req.body.productId;
  req.user.getCart()
  .then(cart =>{
    cart.getProducts({where: {id :prodId}});
  })
  .then(products =>{
    const product = products[0];
    product.cartItem.destroy();
  })
  .then(result =>{
    console.log(`<----Deleted from cart---->`, result)
  })
  .catch(err => console.log(`<----Error Generated while fetching cart---->`, err))
  Product.findById(id, product => {
    Cart.deleteProduct(id, product.price);
    res.redirect('/cart');
  })
}


exports.getOrders = (req, res, next) => {
  req.user.getOrders({include : ['products']}) //get all products related to this order, all done by sequelize
  .then(orders =>{
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
  .then(cart =>{
    fetchedCart = cart;
    return cart.getProducts();
  })
  .then(products =>{
    //user has many orders
    req.user.createOrder()
    .then(order =>{
      return order.addProducts(products.map(product =>{
        product.orderItem  ={
          quantity : product.cartItem.quantity
        }
        return product;
      }))
    })
  })
  .then(result =>{
    return fetchedCart.setProducts(null); //drops all items in cart
  })
  .then(result =>{
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
