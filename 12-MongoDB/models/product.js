const { ObjectId } = require('mongodb');

const getDb = require('../util/database').getDb;

class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
    save() {
        //get the databse
        const db = getDb();
        //connect to product collection inside the db 
        return db.collection('products')
            //insert the current product
            .insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    //static methods can be called on the class itself and not on an instance of the class
    static findById() {
        const db = getDb();
        return db.collection('products').find() //this will provide a cursor through which we can next documents, useful when there are thousands of docs and we dont need all at once
            .toArray() //this will return all products in an array
            .then(products => {
                // console.log(products);
                return products;
            })
            .catch(err => {
                console.log(err);
            })
    }

    static fetchDetails(id) {
        const db = getDb();
        return db.collection('products').findOne({ _id: ObjectId(id) }) //this will provide a cursor through which we can next documents, useful when there are thousands of docs and we dont need all at once
            // .toArray() //this will return all products in an array
            .then(product => {
                return product;
            })
            .catch(err => {
                console.log(err);
            })
    }
}

module.exports = Product;