const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); //it'll parse body

app.use('/add-product', (req, res) => {
    console.log('Adding new product');
    res.send(`<form action="/product" method="Post">
    <input type="text" name="title"/>
    <button type="submit">Add product</button>
    </form>`)
});
app.use('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    res.send('<h1>Hello From Express</h1>')
});

app.listen(3000);