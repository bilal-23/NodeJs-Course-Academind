const path = require('path');
const rootDir = require('../utility/path');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'))
    // res.send('<h1>Shop Page</h1>');
});

module.exports = router;