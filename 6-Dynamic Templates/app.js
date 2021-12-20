const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const app = express();

// handelbars is not defined in express hence we need to define it first
app.engine('hbs', expressHbs());

// pug is defined in express
// app.set('view engine', 'pug'); //for pug 

app.set('view engine', 'hbs') //for handlerbars
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { docTitle: 'Page Not Found' })
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

app.listen(3000);
