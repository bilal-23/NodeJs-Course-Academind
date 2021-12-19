const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const adminRoutes = require('./routes/admin.js');
const shopRoute = require('./routes/shop.js');

app.use(bodyParser.urlencoded({ extended: false })); //it'll parse body

app.use(adminRoutes);
app.use(shopRoute);



app.listen(3000);