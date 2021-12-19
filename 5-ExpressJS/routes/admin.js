const express = require("express");
const router = express.Router();


router.get('/add-product', (req, res) => {
    console.log('Adding new product');
    res.send(`<form action="/admin/add-product" method="Post">
    <input type="text" name="title"/>
    <button type="submit">Add product</button>
    </form>`)
});
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;