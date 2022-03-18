const getDb = require('../util/database').getDb;

class User {
    constructor(username, email) {
        this.name = username;
        this.email = email;
    }
    save() {
        const db = getDb();
        return db.collection('users').insertOne(this);
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