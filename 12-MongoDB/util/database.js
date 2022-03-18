const res = require('express/lib/response');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient
        .connect(`mongodb+srv://bilal:bilal123@cluster0.tfip8.mongodb.net/nodejscourse?retryWrites=true&w=majority`)
        .then(client => {
            console.log(`Connected to MongoDB`);
            _db = client.db(); //this will connect to db mentioned in the above link which is nodejscourse
            callback();
        })
        .catch(err => {
            console.log(`Error: ${err}`);
            throw new Error(err);
        })
}

//get db will give back a db connected to database
const getDb = () => {
    if (_db) {
        return _db;
    }
    throw new Error(`No database found`);
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
