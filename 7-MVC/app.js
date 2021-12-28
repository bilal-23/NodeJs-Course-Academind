const path = require('path');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.set('view engine', 'ejs')
app.set('views', 'views');

const notFoundController = require('./controllers/notFound');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(notFoundController.get404);

app.listen(3000);
