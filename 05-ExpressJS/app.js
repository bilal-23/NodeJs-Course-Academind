const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const rootDir = require('./util/path.js');
const adminRoutes = require('./routes/admin.js');
const shopRoute = require('./routes/shop.js');

app.use(bodyParser.urlencoded({ extended: false })); //it'll parse body
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoute);

app.use((req, res, next) => {
    res.status(404);
    res.sendFile(path.join(rootDir, 'views', '404.html'))
})

app.listen(3000);

