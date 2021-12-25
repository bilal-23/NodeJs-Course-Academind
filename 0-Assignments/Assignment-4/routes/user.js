const path = require('path');
const rootdir = require('../util/path');
const express = require('express');
const router = express.Router();

const addUser = require('./add-user');

router.get('/', (req, res, next) => {
    res.render('user', { users: addUser.users })
    // res.sendFile(path.join(rootdir, 'views', 'user.html'))
    // res.sendFile(path.join(__dirname, '..', 'views', 'user.html'))
})

exports.route = router