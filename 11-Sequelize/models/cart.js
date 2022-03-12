const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
);
module.exports = class Cart {
    static addProduct(id, productPrice) {
        //fetch previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 }
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            //Analyze the cart => find the product if it exist
            const existingItemIndex = cart.products.findIndex(item => item.id === id);
            const existingItem = cart.products[existingItemIndex] //.find(item => item.id === id);
            let updatedProduct;
            if (existingItem) {
                updatedProduct = { ...existingItem };
                updatedProduct.quantity += 1;
                cart.products[existingItemIndex] = updatedProduct;
            }
            else {
                updatedProduct = { id: id, quantity: 1 }
                cart.products.push(updatedProduct);
            }
            cart.totalPrice += productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => console.log(err))
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            console.log(err);
            if (!err) {
                const cart = JSON.parse(fileContent);
                const updatedCart = { ...cart };
                // console.log(updatedCart);
                const product = updatedCart.products.find(item => item.id === id);
                if (!product) {
                    return;
                }
                const quantity = product.quantity;
                updatedCart.products = updatedCart.products.filter(item => item.id !== id);
                updatedCart.totalPrice -= (productPrice * quantity);
                fs.writeFile(p, JSON.stringify(updatedCart), err => {
                    console.log(err);
                })
            }
        })
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb(null)
            } else {
                const cart = JSON.parse(fileContent);
                cb(cart);
            }
        })
    }

}