const res = require('express/lib/response');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;


const mongoConnect = (callback) =>{   
    MongoClient
    .connect(`mongodb+srv://bilal:bilal123@cluster0.tfip8.mongodb.net/nodejscourse?retryWrites=true&w=majority`)
    .then(client =>{
        console.log(`Connected to MongoDB`);
        callback(client);
    })
    .catch(err =>{
        console.log(`Error: ${err}`);
    })
}
    
module.exports = mongoConnect;