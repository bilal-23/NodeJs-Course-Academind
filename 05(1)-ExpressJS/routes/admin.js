const path = require('path');
const rootDir = require('../utility/path');
const express = require('express');
const router = express.Router();

router.get('/add-product', (req, res, next) => {
    console.log(rootDir);
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'))

    //     res.send(`<h1>Add Product Page</h1><form action="/admin/add-product" method="POST">
    //     <input type="text" name="product-name" />
    //     <button>Submit</button>
    // </form>`);
});

router.post('/add-product', (req, res, next) => {
    console.log(req.body)
    res.redirect('/');
})

module.exports = router;