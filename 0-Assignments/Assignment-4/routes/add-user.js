const path = require('path');
const rootdir = require('../util/path');
const express = require('express');
const router = express.Router();

const users = [];

router.get('/', (req, res, next) => {
    res.render('add-user')
    // res.sendFile(path.join(rootdir, 'views', 'index.html'));
    // res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
})
router.post('/', (req, res, next) => {
    if (req.body.user === "") {
        res.status = 400;
        res.redirect('/');
    } else {
        users.push({ name: req.body.user })
        res.redirect('/');
    }
})

exports.route = router;
exports.users = users;