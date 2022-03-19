const { ObjectId } = require('mongodb');

class Product {
    //     constructor(title, price, description, imageUrl, userId) {
    //         this.title = title;
    //         this.price = price;
    //         this.description = description;
    //         this.imageUrl = imageUrl;
    //         this.userId = userId;
    //     }
    //     save() {
    //         //get the databse
    //         const db = getDb();
    //         //connect to product collection inside the db 
    //         return db.collection('products')
    //             //insert the current product
    //             .insertOne(this)
    //             .then(result => {
    //                 console.log(result);
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             });
    //     }

    //     //static methods can be called on the class itself and not on an instance of the class
    //     static fetchAll() {
    //         const db = getDb();
    //         return db.collection('products').find() //this will provide a cursor through which we can next documents, useful when there are thousands of docs and we dont need all at once
    //             .toArray() //this will return all products in an array
    //             .then(products => {
    //                 // console.log(products);
    //                 return products;
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //     }

    //     static findById(id) {
    //         const db = getDb();
    //         return db.collection('products').findOne({ _id: ObjectId(id) }) //this will provide a cursor through which we can next documents, useful when there are thousands of docs and we dont need all at once
    //             // .toArray() //this will return all products in an array
    //             .then(product => {
    //                 return product;
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //     }

    //     static deleteById(id) {
    //         const db = getDb();
    //         return db.collection('products').deleteOne({ _id: ObjectId(id) })
    //             .then(result => {
    //                 return result;
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //     }

    //     static updateProduct(id, title, price, description, imageUrl) {
    //         const db = getDb();
    //         return db.collection('products').updateOne({ _id: ObjectId(id) }, {
    //             $set: {
    //                 title: title,
    //                 price: price,
    //                 description: description,
    //                 imageUrl: imageUrl
    //             }
    //         })
    //             .then(result => {
    //                 return result;
    //             })
    //             .catch(err => {
    //                 console.log(err);
    //             })
    //     }
}

module.exports = Product;