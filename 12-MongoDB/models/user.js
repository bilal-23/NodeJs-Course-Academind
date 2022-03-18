const getDb = require('../util/database').getDb;
const { ObjectId } = require('mongodb');

class User {
    constructor(username, email, cart, id) {
        this.name = username;
        this.email = email;
        this.cart = cart; // {items : [] }
        this._id = id;
    }
    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
    }

    addToCart(product) {
        const cartProductIndex = this.cart?.items?.findIndex(cp => {
            return cp.productId.toString() === product._id.toString();
        });
        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if (cartProductIndex >= 0) {
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
            console.log(`<=== Increasing Quant ===>`)
        } else {
            updatedCartItems.push({ productId: ObjectId(product._id), quantity: newQuantity });
            console.log(`<=== Adding New Quant ===>`)
        }

        const updatedCart = {
            items: updatedCartItems
        }
        const db = getDb();
        return db.collection('users').updateOne({ _id: ObjectId(this._id) }, { $set: { cart: updatedCart } });
    }

    getCart() {
        const db = getDb();
        const productIds = this.cart.items.map(i => i.productId);
        //this returns an array
        return db.collection('products').find({ _id: { $in: productIds } }).toArray() //find all products with the ids
            .then(products => {
                //we need to add the quantity also
                return products.map(p => { //p is fetched from db
                    return {
                        ...p,
                        quantity: this.cart.items.find(i => {
                            return i.productId.toString() === p._id.toString()
                        }).quantity
                    }

                })
            })
    }

    static findById(id) {
        const db = getDb();
        return db.collection('users').findOne({ _id: ObjectId(id) })
            .then(user => {
                return user;
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = User;