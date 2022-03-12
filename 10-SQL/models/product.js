// const fs = require('fs');
// const path = require('path');
const db = require('../util/database');


const Cart = require('./cart');

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   'data',
//   'products.json'
// );

// const getProductsFromFile = cb => {
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = +price;
  }

  save() {
    return db.execute('INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description]
    );
    // getProductsFromFile(products => {
    //   //if id is passed whihc will be in case of editing
    //   if (this.id) {
    //     const existingItemIndex = products.findIndex(prod => prod.id === this.id);
    //     const updatedProducts = [...products];
    //     updatedProducts[existingItemIndex] = this;
    //     fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //       console.log(err);
    //     });
    //     return;
    //   } else {
    //     //when new product is added
    //     this.id = (Math.random() * 100000000000000).toFixed(0) + "";
    //     products.push(this);
    //     fs.writeFile(p, JSON.stringify(products), err => {
    //       console.log(err);
    //     });
    //   }
    // });
  }

  //static function are used directly on class and not on the object created by class
  static fetchAll(cb) {
    // getProductsFromFile(cb);
    //<--SQL-->
    return db.execute('SELECT * FROM products')

  }

  static findById(id) {
    // getProductsFromFile((products) => {
    //   const product = products.find(product => product.id === id);
    //   cb(product);
    // })
    return db.execute(`SELECT * FROM products WHERE products.id = ?`, [id]);
  }

  static deleteProduct(id) {
    //   getProductsFromFile(products => {
    //     const product = products.find(product => product.id === id);
    //     const updatedProducts = products.filter(product => product.id !== id);
    //     fs.writeFile(p, JSON.stringify(updatedProducts), err => {
    //       if (!err) {
    //         Cart.deleteProduct(id, product.price);
    //       }
    //     });
    //   })
  }

};
