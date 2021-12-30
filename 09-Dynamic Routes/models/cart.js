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
}