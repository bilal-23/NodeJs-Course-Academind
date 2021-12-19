const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const adminRoutes = require('./routes/admin.js');
const shopRoute = require('./routes/shop.js');

app.use(bodyParser.urlencoded({ extended: false })); //it'll parse body

app.use('/admin', adminRoutes);
app.use(shopRoute);

app.use((req, res, next) => {
    res.status(404);
    res.send('<h1>Page not found</h1>');
})

app.listen(3000);